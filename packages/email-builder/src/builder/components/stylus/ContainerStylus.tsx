"use client"
import { Fragment, useState } from "react";
import StylusTabs from "../common/StylusTabs";
import { IconLayoutColumns, IconPalette, IconSettings } from "../../icons";

//Components
import Layout from "./_helpers/container/Layout";
import Styles from "./_helpers/container/Styles";
import Advance from "./_helpers/container/Advance";

const ContainerStylus = () => {
    //State
    const [tab, setTab] = useState<number>(0);

    return (
        <Fragment>
            <StylusTabs current={tab} list={list} onChange={setTab} />
            {tab === 0 && <Layout />}
            {tab === 1 && <Styles />}
            {tab === 2 && <Advance />}
        </Fragment>
    );
};

export default ContainerStylus;

const list = [
    {
        icon: <IconLayoutColumns />,
        name: "Layout"
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