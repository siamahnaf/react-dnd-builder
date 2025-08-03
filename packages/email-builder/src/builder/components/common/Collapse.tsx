"use client";
import React, { Component } from "react";

type CollapseProps<T extends React.ElementType = "div"> = {
    animateChildren?: boolean;
    children?: React.ReactNode;
    className?: string;
    component?: T;
    componentProps?: React.ComponentProps<T>;
    duration?: number;
    easing?: string;
    forceInitialAnimation?: boolean;
    isOpen?: boolean;
    onMeasure?: (height: number) => void;
    unmountChildren?: boolean;
};

type CollapseState = {
    height: number | null;
    isAnimating: boolean;
    isMounted: boolean;
    isOpen: boolean;
    shouldAnimate?: boolean;
};

class Collapse<T extends React.ElementType = "div"> extends Component<CollapseProps<T>, CollapseState> {
    static defaultProps: CollapseProps = {
        animateChildren: false,
        component: "div",
        componentProps: {},
        duration: 500,
        easing: "cubic-bezier(0.3,0,0,1)",
        forceInitialAnimation: false,
        isOpen: false,
        onMeasure: () => { },
        unmountChildren: false,
    };

    state: CollapseState = {
        height: this.props.forceInitialAnimation || !this.props.isOpen ? 0 : null,
        isAnimating: false,
        isMounted: false,
        isOpen: this.props.isOpen || false,
    };

    private wrapper: HTMLElement | null = null;
    private previousHeight = 0;
    private raf: number | null = null;
    private timer: ReturnType<typeof setTimeout> | null = null;

    getHeight = () => {
        const child = this.wrapper?.firstElementChild;
        return child ? Math.max(child.clientHeight - 1, 0) : 0; // Adjusted for 1px transition issue
    };

    transition = () => {
        const newHeight = this.props.isOpen ? this.getHeight() : 0;

        clearTimeout(this.timer as NodeJS.Timeout);
        cancelAnimationFrame(this.raf as number);
        this.setState(
            { height: this.previousHeight, isAnimating: true },
            () => {
                this.previousHeight = newHeight;
                this.raf = requestAnimationFrame(() => {
                    this.raf = requestAnimationFrame(() => {
                        this.setState({ height: newHeight }, () => {
                            this.timer = setTimeout(() => {
                                this.setState({ height: this.props.isOpen ? null : 0, isAnimating: false });
                            }, this.props.duration);
                        });
                    });
                });
            }
        );
    };

    componentDidMount() {
        this.setState({ isMounted: true }, () => {
            if (this.props.forceInitialAnimation) {
                this.transition();
            } else {
                this.previousHeight = this.props.isOpen ? this.getHeight() : 0;
            }
        });
    }

    static getDerivedStateFromProps(nextProps: CollapseProps, prevState: CollapseState) {
        const openDidChange = nextProps.isOpen !== prevState.isOpen;
        const forceAnimation = !prevState.isMounted && nextProps.forceInitialAnimation && nextProps.isOpen;

        return {
            isOpen: nextProps.isOpen || false,
            shouldAnimate: openDidChange || forceAnimation,
        };
    }

    componentDidUpdate(prevProps: Readonly<CollapseProps<T>>, prevState: Readonly<CollapseState>, prevHeight: number) {
        if (this.state.isAnimating && !this.state.shouldAnimate) {
            return;
        }

        const newHeight = this.getHeight();
        const childrenDidChange = newHeight !== prevHeight;
        this.props.onMeasure?.(newHeight);

        if (this.state.shouldAnimate || (childrenDidChange && this.props.animateChildren)) {
            this.transition();
        } else if (childrenDidChange) {
            this.previousHeight = this.getHeight();
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer as NodeJS.Timeout);
        cancelAnimationFrame(this.raf as number);
    }

    render() {
        const { isAnimating, isMounted } = this.state;
        const { forceInitialAnimation, isOpen, unmountChildren } = this.props;
        const shouldMount = unmountChildren ? isOpen || isAnimating : true;
        const initiallyHidden = !isMounted && forceInitialAnimation && isOpen;

        return React.createElement(
            this.props.component as React.ElementType,
            {
                ...this.props.componentProps,
                className: this.props.className,
                onTransitionEnd: this.onTransitionEnd,
                ref: (el: HTMLDivElement | null) => {
                    this.wrapper = el;
                },
                style: {
                    ...this.props.componentProps?.style,
                    height: this.state.height,
                    overflow: isAnimating || !isOpen || initiallyHidden ? "hidden" : undefined,
                    visibility: (!isAnimating && !isOpen) || initiallyHidden ? "hidden" : undefined,
                    transition: isAnimating || initiallyHidden
                        ? `height ${this.props.duration}ms ${this.props.easing}`
                        : undefined,
                },
            },
            shouldMount && this.props.children
        );
    }

    private onTransitionEnd = () => {
        this.previousHeight = this.getHeight();
    };
}

export default Collapse;