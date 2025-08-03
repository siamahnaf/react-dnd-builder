import Link from "next/link";
import Image from "next/image";

const HomeUi = () => {
    return (
        <div className="w-[50%] text-center">
            <Image src="/logo-dark.png" width={1057} height={282} alt="Logo" className="w-[240px] mx-auto mb-8" />
            <h4 className="text-4xl font-semibold mb-2">React Drag n Drop Builder</h4>
            <p className="font-light">
                I&apos;ve built a drag-and-drop builder using React that helps you easily create emails, forms, and soon full websites. The email builder supports responsive designs with clean code. The form builder lets you build custom forms without writing complex logic. I&apos;m now planning to sell this tool for developers, freelancers, and small teams who want to speed up their workflow.
            </p>
            <h4 className="text-main mt-3 font-semibold text-lg">Playground</h4>
            <div className="flex gap-x-5 justify-center mt-4">
                <Link href="/playground/email-builder" className="bg-purple-600 text-white py-2 px-4 rounded-lg">
                    Email Builder
                </Link>
                <Link href="/playground/form-builder" className="bg-main text-white py-2 px-4 rounded-lg">
                    Form Builder
                </Link>
            </div>
            <Link href="https://siamahnaf.com/" className="text-cyan-500 text-xl block mt-4">
                www.siamahnaf.com
            </Link>
            <p className="mt-6 italic text-gray-500">** Site is under maintenance, <br /> please contact with me if you have any query!</p>
        </div>
    );
};

export default HomeUi;