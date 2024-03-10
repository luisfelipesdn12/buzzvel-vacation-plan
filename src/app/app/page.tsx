import App from "./app"

import SessionProvider from "@/components/RestrictedPage"

const Page = () => <SessionProvider page={App} redirectIfNotSession="/" />;

export default Page;
