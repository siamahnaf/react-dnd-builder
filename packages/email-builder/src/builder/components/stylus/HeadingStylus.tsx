"use client"
import { Fragment, useState } from "react";
import StylusTabs from "../common/StylusTabs";
import { IconPencil, IconPalette, IconSettings } from "../../icons";

//Components
import Content from "./_helpers/heading/Content";
import Styles from "./_helpers/heading/Styles";
import Advance from "./_helpers/heading/Advance";

const HeadingStylus = () => {
    //State
    const [tab, setTab] = useState<number>(0);

    return (
        <Fragment>
            <StylusTabs current={tab} list={list} onChange={setTab} />
            {tab === 0 && <Content />}
            {tab === 1 && <Styles />}
            {tab === 2 && <Advance />}
        </Fragment>
    );
};

export default HeadingStylus;

const list = [
    {
        icon: <IconPencil />,
        name: "Content"
    },
    {
        icon: <IconPalette />,
        name: "Style"
    },
    {
        icon: <IconSettings />,
        name: "Advance"
    }
]