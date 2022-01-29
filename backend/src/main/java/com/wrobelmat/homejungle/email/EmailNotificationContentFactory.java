package com.wrobelmat.homejungle.email;

public class EmailNotificationContentFactory {

    public static String createNotificationMailContent(String notificationMessage, String btnText, String btnUrl) {
        return
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <title>Home Jungle</title>\n" +
                "    <style>\n" +
                "        html {\n" +
                "            box-sizing: border-box;\n" +
                "        }\n" +
                "        *,\n" +
                "        *::before,\n" +
                "        *::after {\n" +
                "            box-sizing: inherit;\n" +
                "        }\n" +
                "        body {\n" +
                "            margin: 0;\n" +
                "            padding: 0;\n" +
                "            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',\n" +
                "                'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',\n" +
                "                'Helvetica Neue', sans-serif;\n" +
                "            -webkit-font-smoothing: antialiased;\n" +
                "            -moz-osx-font-smoothing: grayscale;\n" +
                "        }\n" +
                "        .content {\n" +
                "            background-color: white;\n" +
                "            max-width: 800px;\n" +
                "            padding: 24px 72px;\n" +
                "            width: auto;\n" +
                "        }\n" +
                "        .title {\n" +
                "            color: #222222fc;\n" +
                "            font-size: 2rem;\n" +
                "            font-weight: 500;\n" +
                "            line-height: 2.5rem;\n" +
                "            letter-spacing: 2px;\n" +
                "            padding-bottom: 12px;\n" +
                "            text-align: center;\n" +
                "            width: 100%;\n" +
                "        }\n" +
                "        .bar {\n" +
                "            border-top-style: solid;\n" +
                "            border-top-width: 1px;\n" +
                "            border-color: #d0d1d3;\n" +
                "            margin: 12px 0;\n" +
                "            width: 100%;\n" +
                "        }\n" +
                "        .message {\n" +
                "            color: #222222fc;\n" +
                "            font-size: 1.3rem;\n" +
                "            font-weight: 400;\n" +
                "            line-height: 2rem;\n" +
                "            padding: 18px 0;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        .message > p {\n" +
                "            margin: 0;\n" +
                "        }\n" +
                "        .a-wrapper {\n" +
                "            padding: 18px 0;\n" +
                "            text-align: center;\n" +
                "            width: 100%;\n" +
                "        }\n" +
                "        a {\n" +
                "            background-color: transparent;\n"  +
                "            border: solid 2px #222222fc;\n" +
                "            color: #222222fc;\n" +
                "            cursor: pointer;\n" +
                "            font-size: 1.3rem;\n" +
                "            font-weight: 400;\n" +
                "            line-height: 2rem;\n" +
                "            margin: 0 auto;\n" +
                "            padding: 10px 18px;\n" +
                "            text-align: center;\n" +
                "            text-decoration: none;\n" +
                "            transition: all 0.15s ease;\n" +
                "        }\n" +
                "        a:hover {\n" +
                "            background-color: #3c3c3cfc;\n" +
                "            border-color: #3c3c3cfc;\n" +
                "            color: white;\n" +
                "        }\n" +
                "        @media screen and (max-width: 640px) {\n" +
                "            .content {\n" +
                "                padding: 18px 24px;\n" +
                "            }\n" +
                "            .title {\n" +
                "                padding-bottom: 8px;\n" +
                "            }\n" +
                "            .bar {\n" +
                "                margin: 8px 0;\n" +
                "            }\n" +
                "            .message {\n" +
                "                padding: 12px 0;\n" +
                "            }\n" +
                "            .a-wrapper {\n" +
                "                padding: 16px 0;\n" +
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
                "        <div class=\"a-wrapper\">\n" +
                "            <a href=\"" + btnUrl + "\">" + btnText + "</a>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
