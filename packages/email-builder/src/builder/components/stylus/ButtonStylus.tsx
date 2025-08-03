"use client"
import { Fragment, useState } from "react";
import StylusTabs from "../common/StylusTabs";
import { IconPencil, IconPalette, IconSettings } from "../../icons";

//Components
import Content from "./_helpers/button/Content";
import Styles from "./_helpers/button/Styles";
import Advance from "./_helpers/button/Advance";

const ButtonStylus = () => {
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

export default ButtonStylus;

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