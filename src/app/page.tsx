import Home from "./home"

import SessionProvider from "@/components/SessionProvider"

const Page = () => <SessionProvider page={Home} />;

export default Page;
