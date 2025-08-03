"use client"
import { Fragment, useState } from "react";
import StylusTabs from "../common/StylusTabs";
import { IconPencil, IconSettings } from "../../icons";

//Components
import Content from "./_helpers/html/Content";
import Advance from "./_helpers/html/Advance";

const HtmlStylus = () => {
    //State
    const [tab, setTab] = useState<number>(0);

    return (
        <Fragment>
            <StylusTabs current={tab} list={list} onChange={setTab} />
            {tab === 0 && <Content />}
            {tab === 1 && <Advance />}
        </Fragment>
    );
};

export default HtmlStylus;

const list = [
    {
        icon: <IconPencil />,
        name: "Content"
    },
    {
        icon: <IconSettings />,
        name: "Advance"
    }
]