import Link from "next/link";

export function ProjectsCtaButton() {
    return (
        <div className="flex justify-center mt-20">
            <Link
                href="/projects"
                className="rounded-full bg-[#fc6d5c] px-8 py-4 text-white font-semibold hover:bg-[#4745a7] transition"
            >
                Check Out More Projects
            </Link>
        </div>
    );
}
