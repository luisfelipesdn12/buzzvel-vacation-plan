import Home from "./home";

import SessionProvider from "@/components/SessionProvider";

/**
 * The root web route. Uses SessionProvider to render Home component.
 */
const Page = () => <SessionProvider page={Home} />;

export default Page;
