import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";

const HomePage: NextPage = () => {
    return (
        <>
            <Navbar />
            <Home />
        </>
    );
};

export default HomePage;

<Home />;
