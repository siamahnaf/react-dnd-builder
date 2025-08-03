import React from "react";

function normalizeHtml(str: string): string {
    return str
        ? str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>')
        : str;
}

function shallowEqual(
    a: React.CSSProperties | undefined,
    b: React.CSSProperties | undefined
): boolean {
    if (a === b) return true;
    if (!a || !b) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(k => a[k as keyof typeof a] === b[k as keyof typeof b]);
}

function replaceCaret(el: HTMLElement) {
    const target = document.createTextNode('');
    el.appendChild(target);
    if (document.activeElement === el && target.nodeValue !== null) {
        const sel = window.getSelection();
        if (sel) {
            const range = document.createRange();
            range.setStart(target, target.nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        el.focus();
    }
}

export type ContentEditableEvent = React.SyntheticEvent<
    HTMLElement,
    Event
> & { target: { value: string } };

type Modify<T, R> = Omit<T, keyof R> & R;
type DivProps = Modify<
    React.JSX.IntrinsicElements['div'],
    { onChange?: (event: ContentEditableEvent) => void }
>;

export interface Props extends DivProps {
    html: string;
    disabled?: boolean;
    tagName?: string;
    className?: string;
    style?: React.CSSProperties;
    innerRef?: React.RefObject<HTMLElement> | ((node: HTMLElement | null) => void);
    placeholder?: string;
}

export default class ContentEditable extends React.Component<Props> {
    private lastHtml = this.props.html;
    private el: React.RefObject<HTMLElement | null> =
        typeof this.props.innerRef === 'function'
            ? { current: null }
            : React.createRef<HTMLElement>();

    private getEl = () =>
        (
            this.props.innerRef && typeof this.props.innerRef !== 'function'
                ? this.props.innerRef
                : this.el
        ).current;

    render() {
        const { tagName = 'div', html, innerRef, children, ...rest } = this.props;

        return React.createElement(
            tagName,
            {
                ...rest,
                ref:
                    typeof innerRef === 'function'
                        ? (node: HTMLElement | null) => {
                            innerRef(node);
                            this.el.current = node;
                        }
                        : innerRef || this.el,
                onInput: this.emitChange,
                onBlur: this.props.onBlur || this.emitChange,
                onKeyUp: this.props.onKeyUp || this.emitChange,
                onKeyDown: this.props.onKeyDown || this.emitChange,
                contentEditable: !this.props.disabled,
                dangerouslySetInnerHTML: { __html: html },
            },
            children
        );
    }

    shouldComponentUpdate(nextProps: Props): boolean {
        const el = this.getEl();
        if (!el) return true;

        if (normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML))
            return true;

        const p = this.props;
        return (
            p.disabled !== nextProps.disabled ||
            p.tagName !== nextProps.tagName ||
            p.className !== nextProps.className ||
            p.innerRef !== nextProps.innerRef ||
            p.placeholder !== nextProps.placeholder ||
            !shallowEqual(p.style, nextProps.style)
        );
    }

    componentDidUpdate() {
        const el = this.getEl();
        if (!el) return;

        if (this.props.html !== el.innerHTML) {
            el.innerHTML = this.props.html;
        }
        this.lastHtml = this.props.html;
        replaceCaret(el);
    }

    private emitChange = (origEvt: React.SyntheticEvent<HTMLElement>) => {
        const el = this.getEl();
        if (!el) return;

        const html = el.innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            const evt = Object.assign({}, origEvt, {
                target: { value: html },
            }) as ContentEditableEvent;
            this.props.onChange(evt);
        }
        this.lastHtml = html;
    };
}
