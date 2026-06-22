"use client";

import { motion } from "framer-motion";

interface Service {
    title: string;

}

interface ServicePillsProps {
    services: Service[];
}

const positions = [
    { left: "0%", top: "55%", rotate: 0 },
    { left: "18%", top: "30%", rotate: 90 },
    { left: "26%", top: "42%", rotate: 0 },
    { left: "40%", top: "55%", rotate: 0 },
    { left: "52%", top: "30%", rotate: 0 },
    { left: "70%", top: "18%", rotate: -45 },
    { left: "68%", top: "55%", rotate: 0 },
    { left: "32%", top: "15%", rotate: 0 },
];
const colors = [
    "#06B6D4",
    "#22C55E",
    "#FACC15",
    "#EC4899",
    "#3B82F6",
    "#8B5CF6",
    "#F97316",
    "#14B8A6",
];

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemVariants = {
    hidden: {
        y: -800,
        opacity: 0,
        scale: 0.8,
    },
    show: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 70,
            damping: 8,
            mass: 0.8,
        },
    },
};

export default function ServicePills({
    services,
}: ServicePillsProps) {
    return (
        <>
            {/* Desktop Layout: absolute animated positions */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{
                    once: false,
                    amount: 0.2,
                }}
                className="relative w-full h-[320px] max-w-[850px] mx-auto overflow-hidden hidden sm:block"
            >
                {services.map((service, index) => {
                    const position = positions[index % positions.length];
                    const color = colors[index % colors.length];

                    return (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            className="absolute"
                            style={{
                                left: position.left,
                                top: position.top,
                            }}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -8, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 5
                                }}
                                className="
                    px-8
                    py-4
                    rounded-full
                    font-bold
                    text-lg
                    text-white
                    whitespace-nowrap
                    cursor-pointer
                    shadow-[0_20px_50px_rgba(0,0,0,0.12)]
                  "
                                style={{
                                    backgroundColor: color,
                                    transform: `rotate(${position.rotate}deg)`,
                                }}
                              >
                                {service.title}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Mobile Layout: Wrapping static pills */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-2.5 justify-center items-center w-full py-4 sm:hidden"
            >
                {services.map((service, index) => {
                    const color = colors[index % colors.length];
                    return (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            className="px-5 py-2.5 rounded-full font-bold text-xs text-white cursor-pointer shadow-md"
                            style={{ backgroundColor: color }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {service.title}
                        </motion.div>
                    );
                })}
            </motion.div>
        </>
    );
}