package com.wrobelmat.homejungle.email;

public class EmailNotificationContentFactory {

    public static String createNotificationMailContent(String notificationMessage, String btnText, String btnUrl) {
        return
                "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Home Jungle</title>\n" +
                "    <style>\n" +
                "        html {\n" +
                "            font-size: 100%;\n" +
                "            box-sizing: border-box;\n" +
                "        }\n" +
                "\n" +
                "        *,\n" +
                "        *::before,\n" +
                "        *::after {\n" +
                "            box-sizing: inherit;\n" +
                "        }\n" +
                "\n" +
                "        body {\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',\n" +
                "                'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',\n" +
                "                'Helvetica Neue', sans-serif;\n" +
                "            -webkit-font-smoothing: antialiased;\n" +
                "            -moz-osx-font-smoothing: grayscale;\n" +
                "        }\n" +
                "\n" +
                "        :root {\n" +
                "            /* colors */\n" +
                "            --color-anthracite: rgba(34, 34, 34, 0.99);\n" +
                "            --color-bar: #d0d1d3;\n" +
                "            --color-grey: rgba(60, 60, 60, 0.99);\n" +
                "\n" +
                "            /* font sizes */\n" +
                "            --font-size-normal: 1.3rem;\n" +
                "            --font-size-l: 2rem;\n" +
                "\n" +
                "            /* font weights */\n" +
                "            --font-weight-light: 400;\n" +
                "            --font-weight-heavy: 700;\n" +
                "\n" +
                "            /* line heights */\n" +
                "            --line-height-normal: 2rem;\n" +
                "            --line-height-l: 2.5rem;\n" +
                "        }\n" +
                "\n" +
                "        .content {\n" +
                "            align-items: center;\n" +
                "            background-color: white;\n" +
                "            display: flex;\n" +
                "            flex-direction: column;\n" +
                "            justify-content: center;\n" +
                "            padding: 24px 72px;\n" +
                "            width: 100vw;\n" +
                "        }\n" +
                "\n" +
                "        .title {\n" +
                "            color: var(--color-anthracite);\n" +
                "            font-size: var(--font-size-l);\n" +
                "            font-weight: 500;\n" +
                "            line-height: var(--line-height-l);\n" +
                "            letter-spacing: 2px;\n" +
                "            padding-bottom: 12px;\n" +
                "        }\n" +
                "\n" +
                "        .bar {\n" +
                "            border-top-style: solid;\n" +
                "            border-top-width: 1px;\n" +
                "            border-color: var(--color-bar);\n" +
                "            margin: 12px 0;\n" +
                "            width: 100%;\n" +
                "        }\n" +
                "\n" +
                "\n" +
                "        .message {\n" +
                "            color: var(--color-anthracite);\n" +
                "            text-align: center;\n" +
                "            font-size: var(--font-size-normal);\n" +
                "            font-weight: var(--font-weight-light);\n" +
                "            line-height: var(--line-height-normal);\n" +
                "            padding: 18px 24px;\n" +
                "        }\n" +
                "\n" +
                "        .message > p {\n" +
                "            margin: 0;\n" +
                "        }\n" +
                "\n" +
                "        .btn-wrapper {\n" +
                "            padding: 12px 0;\n" +
                "            width: 40vw;\n" +
                "        }\n" +
                "\n" +
                "        .btn-wrapper > a {\n" +
                "            text-decoration: none;\n" +
                "        }\n" +
                "\n" +
                "        .btn {\n" +
                "            align-items: center;\n" +
                "            background-color: transparent;\n" +
                "            border: none;\n" +
                "            border-radius: 0;\n" +
                "            box-shadow: inset 0 0 0 2px var(--color-anthracite);\n" +
                "            color: var(--color-anthracite);\n" +
                "            cursor: pointer;\n" +
                "            display: inline-flex;\n" +
                "            flex-direction: row;\n" +
                "            font-size: var(--font-size-normal);\n" +
                "            font-weight: var(--font-weight-light);\n" +
                "            justify-content: center;\n" +
                "            line-height: var(--line-height-normal);\n" +
                "            margin: 0;\n" +
                "            outline: none;\n" +
                "            padding: 12px;\n" +
                "            transition: all 0.15s ease;\n" +
                "            width: 100%;\n" +
                "        }\n" +
                "\n" +
                "        .btn:hover {\n" +
                "            background-color: var(--color-grey);\n" +
                "            box-shadow: inset 0 0 0 2px var(--color-grey);\n" +
                "            color: white;\n" +
                "        }\n" +
                "\n" +
                "        @media (min-width: 1200px) {\n" +
                "            .btn-wrapper {\n" +
                "                width: 20vw;\n" +
                "            }\n" +
                "        }\n" +
                "\n" +
                "        @media (min-width: 800px) and (max-width: 1200px) {\n" +
                "            .btn-wrapper {\n" +
                "                width: 30vw;\n" +
                "            }\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"content\">\n" +
                "        <div class=\"title\">Home Jungle</div>\n" +
                "        <div class=\"bar\"></div>\n" +
                "        <div class=\"message\">\n" +
                            notificationMessage +
                "        </div>\n" +
                "        <div class=\"btn-wrapper\">\n" +
                "            <a href=\"" + btnUrl + "\"><button class=\"btn\">" + btnText + "</button></a>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
