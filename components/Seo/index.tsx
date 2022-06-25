import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

// !STARTERCONF Change these default meta
const defaultMeta = {
    title: "Chiketto",
    siteName: "chiketto.com",
    description: "Create and monetize your events in with Chiketto",
    url: "https://chiketto.com",
    type: "website",
    robots: "follow, index",
    /** No need to be filled, will be populated with openGraph function */
    image: "",
};

type SeoProps = {
    date?: string;
    templateTitle?: string;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
    const router = useRouter();
    const [theme, setTheme] = useState(false);
    React.useEffect(() => {
        const osTheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(osTheme);
    }, []);
    const meta = {
        ...defaultMeta,
        ...props,
    };
    meta["title"] = props.templateTitle
        ? `${props.templateTitle} | ${meta.siteName}`
        : meta.title;

    // Use siteName if there is templateTitle
    // but show full title if there is none
    // meta['image'] = openGraph({
    //     description: meta.description,
    //     siteName: props.templateTitle ? meta.siteName : meta.title,
    //     templateTitle: props.templateTitle,
    // });

    // https://dev.to/kleveland/generating-sharable-content-images-with-open-graph-and-nextjs-4e34

    const favs = !theme ? darkfavicons : favicons;

    return (
        <Head>
            <title>{meta.title}</title>
            <meta name="robots" content={meta.robots} />
            <meta content={meta.description} name="description" />
            <meta property="og:url" content={`${meta.url}${router.asPath}`} />
            <link rel="canonical" href={`${meta.url}${router.asPath}`} />
            {/* Open Graph */}
            <meta property="og:type" content={meta.type} />
            <meta property="og:site_name" content={meta.siteName} />
            <meta
                property="og:description"
                content={props.description || meta.description}
            />
            <meta property="og:title" content={meta.title} />
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@curatodotlink" />
            <meta name="twitter:title" content={meta.title} />
            <meta name="twitter:description" content={meta.description} />
            <meta property="og:type" content="website" />
            <meta content="summary_large_image" name="twitter:card" />
            {meta.date && (
                <>
                    <meta
                        property="article:published_time"
                        content={meta.date}
                    />
                    <meta
                        name="publish_date"
                        property="og:publish_date"
                        content={meta.date}
                    />
                    <meta
                        name="author"
                        property="article:author"
                        content="Curato"
                    />
                </>
            )}

            {/* Favicons */}
            {favs.map((linkProps) => (
                <link key={linkProps.href} {...linkProps} />
            ))}
            <meta name="msapplication-TileColor" content="#000" />
            <meta name="theme-color" content="#000" />
        </Head>
    );
}

type Favicons = {
    href: string;
    rel: string;
    sizes?: string;
    type?: string;
};

// !STARTERCONF this is the default favicon, you can generate your own from https://www.favicon-generator.org/ then replace the whole /public/favicon folder
const favicons: Array<Favicons> = [
    {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/favicon/light/apple-icon-57x57.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/favicon/light/apple-icon-60x60.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/favicon/light/apple-icon-72x72.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/favicon/light/apple-icon-76x76.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/favicon/light/apple-icon-114x114.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/favicon/light/apple-icon-120x120.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/favicon/light/apple-icon-144x144.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/favicon/light/apple-icon-152x152.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/light/apple-icon-180x180.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon/light/android-icon-192x192.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/light/favicon-32x32.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon/light/favicon-96x96.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/light/favicon-16x16.png",
    },
    {
        rel: "manifest",
        href: "/favicon/light/manifest.json",
    },
];
const darkfavicons: Array<Favicons> = [
    {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/favicon/dark/apple-icon-57x57.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/favicon/dark/apple-icon-60x60.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/favicon/dark/apple-icon-72x72.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/favicon/dark/apple-icon-76x76.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/favicon/dark/apple-icon-114x114.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/favicon/dark/apple-icon-120x120.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/favicon/dark/apple-icon-144x144.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/favicon/dark/apple-icon-152x152.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/favicon/dark/apple-icon-180x180.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon/dark/android-icon-192x192.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/dark/favicon-32x32.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon/dark/favicon-96x96.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/dark/favicon-16x16.png",
    },
    {
        rel: "manifest",
        href: "/favicon/dark/manifest.json",
    },
];
