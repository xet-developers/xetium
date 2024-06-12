import {HeaderLanding} from "@/features/HeaderLanding";
import {AboutServiceLanding} from "@/features/AboutServiceLanding";
import {FunctionLanding} from "@/widgets/FunctionLanding";
import {FooterLanding} from "@/features/FooterLanding";
import {WordEndLanding} from "@/features/WordEndLanding";

export const LandingPage = () => {
    return (
        <div style={{scrollBehavior: 'smooth'}}>
            <HeaderLanding />
            <AboutServiceLanding />
            <FunctionLanding />
            <WordEndLanding />
            <FooterLanding />
        </div>
    );
};

