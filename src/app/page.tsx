import Home from "./home"

import SessionProvider from "@/components/RestrictedPage"

const Page = () => <SessionProvider page={Home} />;

export default Page;
