// ==UserScript==
// @name         slither.io ゲームパッド
// @namespace    http://tampermonkey.net/
// @version      2024-04-15
// @description  try to take over the world!
// @author       You
// @match        http*://slither.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(() => {
	// Your code here...
	let isButton2Pressed = false;
	let isButton4Pressed = false;
	let isButton5Pressed = false;

	// setInterval(() => {
	// 	if (window.desiredGSC) {
	// 		window.gsc = window.desiredGSC;
	// 	}
	// }, 100);

	const updateGamepad = () => {
		const gamepads = navigator.getGamepads();

		for (let i = 0; i < gamepads.length; i++) {
			const gamepad = gamepads[i];

			if (!gamepad) {
				continue;
			}

			// 左スティックの入力を取得
			const leftStickX = gamepad.axes[0];
			const leftStickY = gamepad.axes[1];

			// スティックの方向に基づいてカーソルを移動
			if (Math.abs(leftStickX) > 0.05 || Math.abs(leftStickY) > 0.05) {
				const angle = Math.atan2(leftStickY, leftStickX);

				// スティックの方向に基づいてcanvas内の特定の位置をホバー
				const canvas = document.querySelector("canvas.nsi");
				if (canvas) {
					const rect = canvas.getBoundingClientRect();
					const hoverDistance = Math.min(canvas.width, canvas.height) * 0.45; // canvasの大きさの90%の半径
					const x =
						rect.left + canvas.width / 2 + hoverDistance * Math.cos(angle);
					const y =
						rect.top + canvas.height / 2 + hoverDistance * Math.sin(angle);

					const event = new MouseEvent("mousemove", {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: x,
						clientY: y,
					});
					canvas.dispatchEvent(event);
				}
			}

			// 四角ボタン（button2）の状態を取得
			const isButton2PressedNow = gamepad.buttons[2].pressed;

			if (isButton2PressedNow && !isButton2Pressed) {
				// ボタンが押された瞬間の処理
				const canvas = document.querySelector("canvas.nsi");
				if (canvas) {
					const rect = canvas.getBoundingClientRect();
					const x = rect.left + canvas.width / 2;
					const y = rect.top + canvas.height / 2;

					const downEvent = new MouseEvent("mousedown", {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: x,
						clientY: y,
					});
					canvas.dispatchEvent(downEvent);
				}
			} else if (!isButton2PressedNow && isButton2Pressed) {
				// ボタンが離された瞬間の処理
				const canvas = document.querySelector("canvas.nsi");
				if (canvas) {
					const rect = canvas.getBoundingClientRect();
					const x = rect.left + canvas.width / 2;
					const y = rect.top + canvas.height / 2;

					const upEvent = new MouseEvent("mouseup", {
						view: window,
						bubbles: true,
						cancelable: true,
						clientX: x,
						clientY: y,
					});
					canvas.dispatchEvent(upEvent);
				}
			}

			isButton2Pressed = isButton2PressedNow;

			// button4とbutton5の状態を取得
			const isButton4PressedNow = gamepad.buttons[4].pressed;
			const isButton5PressedNow = gamepad.buttons[5].pressed;

			if (isButton4PressedNow && !isButton4Pressed) {
				// window.desiredGSC = window.gsc * 0.9;
				// window.gsc = window.desiredGSC;
			}

			if (isButton5PressedNow && !isButton5Pressed) {
				// window.desiredGSC = window.gsc * 1.11;
				// window.gsc = window.desiredGSC;
			}

			isButton4Pressed = isButton4PressedNow;
			isButton5Pressed = isButton5PressedNow;
		}
		requestAnimationFrame(updateGamepad);
	};

	// 次のフレームでゲームパッドの状態を更新
	updateGamepad();
})();
