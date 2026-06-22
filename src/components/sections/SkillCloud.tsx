// "use client";

// import { useEffect, useRef } from "react";
// import Matter from "matter-js";

// interface SkillCloudProps {
//   skills: string[];
// }

// export default function SkillCloud({
//   skills,
// }: SkillCloudProps) {
//   const sceneRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!sceneRef.current) return;

//     const {
//       Engine,
//       Render,
//       Runner,
//       Bodies,
//       Composite,
//       Events,
//     } = Matter;

//     const width = sceneRef.current.clientWidth;
//     const height = 420;

//     const engine = Engine.create();

//     engine.gravity.y = 1;

//     const render = Render.create({
//       element: sceneRef.current,
//       engine,
//       options: {
//         width,
//         height,
//         wireframes: false,
//         background: "transparent",
//       },
//     });

//     const floor = Bodies.rectangle(
//       width / 2,
//       height + 20,
//       width,
//       40,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: "transparent",
//         },
//       }
//     );

//     const leftWall = Bodies.rectangle(
//       -20,
//       height / 2,
//       40,
//       height,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: "transparent",
//         },
//       }
//     );

//     const rightWall = Bodies.rectangle(
//       width + 20,
//       height / 2,
//       40,
//       height,
//       {
//         isStatic: true,
//         render: {
//           fillStyle: "transparent",
//         },
//       }
//     );

//     Composite.add(engine.world, [
//       floor,
//       leftWall,
//       rightWall,
//     ]);

//     const colors = [
//       "#06B6D4",
//       "#22C55E",
//       "#FACC15",
//       "#EC4899",
//       "#3B82F6",
//       "#8B5CF6",
//       "#F97316",
//       "#14B8A6",
//       "#FF7849",
//     ];

//     const skillBodies: Matter.Body[] = [];

//     skills.forEach((skill, index) => {
//       const pillWidth = Math.max(
//         skill.length * 14,
//         120
//       );

//       const pill = Bodies.rectangle(
//         100 + index * 80,
//         -300 - index * 120,
//         pillWidth,
//         56,
//         {
//           restitution: 0.5,
//           friction: 0.2,
//           density: 0.001,
//           chamfer: {
//             radius: 28,
//           },
//           render: {
//             fillStyle:
//               colors[index % colors.length],
//           },
//         }
//       );

//       skillBodies.push(pill);

//       Composite.add(engine.world, pill);
//     });

//     Events.on(render, "afterRender", () => {
//       const ctx = render.context;

//       skillBodies.forEach((body, index) => {
//         ctx.save();

//         ctx.translate(
//           body.position.x,
//           body.position.y
//         );

//         ctx.rotate(body.angle);

//         ctx.fillStyle =
//           colors[index % colors.length] === "#FACC15"
//             ? "#111827"
//             : "#FFFFFF";

//         ctx.font =
//           "600 15px Inter, sans-serif";

//         ctx.textAlign = "center";
//         ctx.textBaseline = "middle";

//         ctx.fillText(
//           skills[index],
//           0,
//           0
//         );

//         ctx.restore();
//       });
//     });

//     Render.run(render);

//     const runner = Runner.create();

//     Runner.run(runner, engine);

//     return () => {
//       Render.stop(render);
//       Runner.stop(runner);

//       Composite.clear(
//         engine.world,
//         false
//       );

//       Engine.clear(engine);

//       render.canvas.remove();
//     };
//   }, [skills]);

//   return (
//     <div
//       ref={sceneRef}
//       className="w-full h-[420px]"
//     />
//   );
// }


"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";

interface SkillCloudProps {
    skills: string[];
}

export default function SkillCloud({
    skills,
}: SkillCloudProps) {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sceneRef.current) return;

        const {
            Engine,
            Render,
            Runner,
            Bodies,
            Composite,
            Events,
            Body,
        } = Matter;

        const width = sceneRef.current.clientWidth;
        const height = 420;

        const engine = Engine.create();

        engine.gravity.y = 1.2;

        const render = Render.create({
            element: sceneRef.current,
            engine,
            options: {
                width,
                height,
                wireframes: false,
                background: "transparent",
            },
        });

        const floor = Bodies.rectangle(
            width / 2,
            height + 20,
            width,
            40,
            {
                isStatic: true,
                render: {
                    fillStyle: "transparent",
                },
            }
        );

        const leftWall = Bodies.rectangle(
            -20,
            height / 2,
            40,
            height,
            {
                isStatic: true,
                render: {
                    fillStyle: "transparent",
                },
            }
        );

        const rightWall = Bodies.rectangle(
            width + 20,
            height / 2,
            40,
            height,
            {
                isStatic: true,
                render: {
                    fillStyle: "transparent",
                },
            }
        );

        Composite.add(engine.world, [
            floor,
            leftWall,
            rightWall,
        ]);

        const colors = [
            "#06B6D4",
            "#22C55E",
            "#FACC15",
            "#EC4899",
            "#3B82F6",
            "#8B5CF6",
            "#F97316",
            "#14B8A6",
            "#FF7849",
        ];

        const getRandom = (
            min: number,
            max: number
        ) =>
            Math.random() * (max - min) + min;

        const skillBodies: Matter.Body[] = [];

        skills.forEach((skill) => {
            const pillWidth = Math.max(
                skill.length * 14,
                120
            );

            const randomColor =
                colors[
                Math.floor(
                    Math.random() * colors.length
                )
                ];

            const pill = Bodies.rectangle(
                getRandom(80, width - 80),
                getRandom(-1500, -100),
                pillWidth,
                56,
                {
                    restitution: 0.55,
                    friction: 0.15,
                    density: 0.001,
                    angle: getRandom(-0.8, 0.8),

                    chamfer: {
                        radius: 28,
                    },

                    render: {
                        fillStyle: randomColor,
                    },
                }
            );

            Body.setVelocity(pill, {
                x: getRandom(-3, 3),
                y: getRandom(0, 4),
            });

            skillBodies.push(pill);

            Composite.add(engine.world, pill);
        });

        Events.on(render, "afterRender", () => {
            const ctx = render.context;

            skillBodies.forEach((body, index) => {
                ctx.save();

                ctx.translate(
                    body.position.x,
                    body.position.y
                );

                let angle = body.angle;

                // Prevent upside-down text
                if (angle > Math.PI / 2) {
                    angle -= Math.PI;
                }

                if (angle < -Math.PI / 2) {
                    angle += Math.PI;
                }

                ctx.rotate(angle);

                const fillColor =
                    body.render.fillStyle as string;

                ctx.fillStyle =
                    fillColor === "#FACC15"
                        ? "#111827"
                        : "#FFFFFF";

                ctx.font =
                    "600 15px Inter, sans-serif";

                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText(
                    skills[index],
                    0,
                    0
                );

                ctx.restore();
            });
        });

        Render.run(render);

        const runner = Runner.create();

        Runner.run(runner, engine);

        return () => {
            Render.stop(render);
            Runner.stop(runner);

            Composite.clear(
                engine.world,
                false
            );

            Engine.clear(engine);

            render.canvas.remove();
        };
    }, [skills]);

    return (
        <div
            ref={sceneRef}
            className="w-full h-[420px]"
        />
    );
}

