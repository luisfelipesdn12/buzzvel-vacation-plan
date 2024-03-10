import App from "./app";

import SessionProvider from "@/components/SessionProvider";

const Page = () => <SessionProvider page={App} redirectIfNotSession="/" />

export default Page;
