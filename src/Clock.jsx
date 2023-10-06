import { useEffect, useState } from "react";

const clockNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function Clock() {
    function ClockInt({ n }) {
        return (
            <div
                style={{
                    textAlign: "center",
                    transform: `rotateZ(-${n * 30}deg)`,
                }}>
                {n}
            </div>
        );
    }

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [load, setLoad] = useState(true);

    useEffect(() => {
        const timeUpdate = setInterval(() => {
            const date = new Date();
            setHours(date.getHours() % 12 || 0);
            setMinutes(date.getMinutes());
            setSeconds(date.getSeconds());
        });

        setLoad(false)

        return () => clearInterval(timeUpdate);
    }, []);

    if(load) return <div>Loading...</div>

    return (
        <div className="clock">
            <div className="clockCenter"></div>
            {clockNumbers.map((clockNumber) => {
                return (
                    <div
                        key={clockNumber}
                        style={{
                            height: "50%",
                            width: "1rem",
                            transformOrigin: "bottom",
                            transform: `translateX(-50%) rotateZ(${
                                clockNumber * 30
                            }deg )`,
                            left: "50%",
                            position: "absolute",
                        }}>
                        <ClockInt n={clockNumber} />
                    </div>
                );
            })}

            <div
                className="hand hours"
                style={{
                    transform: `rotateZ(${hours * 30 - 180 + minutes * 0.5}deg)`,
                    transformOrigin: "top",
                }}></div>
            <div
                className="hand minutes"
                style={{
                    transform: `rotateZ(${minutes * 6 - 180}deg)`,
                    transformOrigin: "top",
                }}></div>
            <div
                className="hand seconds"
                style={{
                    transform: `rotateZ(${seconds * 6 - 180}deg)`,
                    transformOrigin: "top",
                }}></div>
        </div>
    );
}

export default Clock;
