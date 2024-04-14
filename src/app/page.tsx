"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
	const [leftStickX, setLeftStickX] = useState(0);
	const [leftStickY, setLeftStickY] = useState(0);
	const [frameCount, setFrameCount] = useState(0);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");

		// ゲームパッドの状態を更新する関数
		const updateGamepad = () => {
			// フレームカウントを更新
			setFrameCount((frameCount) => frameCount + 1);
			const gamepads = navigator.getGamepads();

			for (let i = 0; i < gamepads.length; i++) {
				const gamepad = gamepads[i];

				if (gamepad) {
					// 左スティックの入力を取得
					const leftStickX = gamepad.axes[0];
					const leftStickY = gamepad.axes[1];

					setLeftStickX(leftStickX);
					setLeftStickY(leftStickY);

					if (!ctx || !canvas) {
						return;
					}

					// canvasの背景色を黒に設定
					ctx.fillStyle = "black";
					ctx.fillRect(0, 0, canvas.width, canvas.height);

					// 円を描画
					ctx.beginPath();
					ctx.arc(canvas.width / 2, canvas.height / 2, 100, 0, 2 * Math.PI);
					ctx.strokeStyle = "white"; // 変更
					ctx.lineWidth = 2;
					ctx.stroke();

					// スティックの方向を赤いポイントとして表示
					if (Math.abs(leftStickX) > 0.05 || Math.abs(leftStickY) > 0.05) {
						const angle = Math.atan2(leftStickY, leftStickX);
						const pointX = canvas.width / 2 + 100 * Math.cos(angle);
						const pointY = canvas.height / 2 + 100 * Math.sin(angle);
						ctx.beginPath();
						ctx.arc(pointX, pointY, 20, 0, 2 * Math.PI);
						ctx.fillStyle = "red";
						ctx.fill();
					}
				}
			}

			// 次のフレームでゲームパッドの状態を更新
			requestAnimationFrame(updateGamepad);
		};

		// イベントリスナーを追加
		// window.addEventListener("gamepadconnected", handleGamepadConnected);
		// window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

		// ゲームパッドの状態の更新を開始
		updateGamepad();

		// クリーンアップ関数
		return () => {
			// イベントリスナーを削除
			// window.removeEventListener("gamepadconnected", handleGamepadConnected);
			// window.removeEventListener(
			// "gamepaddisconnected",
			// handleGamepadDisconnected,
			// );
		};
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div>
				<canvas ref={canvasRef} width="400" height="400" />
				<p>Left Stick X: {leftStickX}</p>
				<p>Left Stick Y: {leftStickY}</p>
				<p>frame: {frameCount}</p>
			</div>
		</main>
	);
}
