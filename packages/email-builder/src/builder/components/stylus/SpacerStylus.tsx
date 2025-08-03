"use client"
import { Fragment, useState } from "react";
import StylusTabs from "../common/StylusTabs";
import { IconPalette, IconSettings } from "../../icons";

//Components
import Styles from "./_helpers/spacer/Styles";
import Advance from "./_helpers/spacer/Advance";

const SpacerStylus = () => {
    //State
    const [tab, setTab] = useState<number>(0);

    return (
        <Fragment>
            <StylusTabs current={tab} list={list} onChange={setTab} />
            {tab === 0 && <Styles />}
            {tab === 1 && <Advance />}
        </Fragment>
    );
};

export default SpacerStylus;

const list = [
    {
        icon: <IconPalette />,
        name: "Style"
    },
    {
        icon: <IconSettings />,
        name: "Advance"
    }
]