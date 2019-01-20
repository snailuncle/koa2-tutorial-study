ct.beginPath() //开始
ct.lineWidth = "3";
ct.strokeStyle = "pink";
//起点
ct.moveTo(75, 15); //控制范围  结束
//context.quadraticCurveTo(cpx, cpy, x, y);
ct.quadraticCurveTo(220, 26, 220, 160); //第一步












ct.moveTo(219, 141);
ct.quadraticCurveTo(240, 300, 70, 250); //第三步
//   ct.stroke()
ct.moveTo(76, 253);
ct.quadraticCurveTo(16, 220, 74, 111);

ct.moveTo(73, 112);
ct.quadraticCurveTo(60, 112, 31, 83);
ct.moveTo(31, 83);
ct.quadraticCurveTo(23, 26, 75, 15);
ct.moveTo(75, 15);
ct.quadraticCurveTo(108, 32, 99, 61);
ct.moveTo(99, 61);
ct.quadraticCurveTo(66, 101, 31, 81);








ct.stroke();
//  鼻子的两个孔
ct.beginPath();
ct.arc(48, 48, 6, 0 * Math.PI, 2.5 * Math.PI);
ct.stroke();
ct.beginPath();
ct.arc(77, 48, 6, 0 * Math.PI, 2.5 * Math.PI);
ct.stroke();
//耳朵

//左耳朵
ct.beginPath();
ct.moveTo(149, 31);
ct.quadraticCurveTo(155, 0, 189, 6);
ct.moveTo(189, 6);
ct.quadraticCurveTo(188, 30, 170, 44);
//右耳朵
ct.moveTo(188, 59);
ct.quadraticCurveTo(198, 24, 222, 32);
ct.moveTo(222, 32);
ct.quadraticCurveTo(255, 54, 199, 75);
ct.stroke();

//嘴巴
ct.beginPath();
ct.arc(93, 178, 30, 0 * Math.PI, 2.5 * Math.PI);
ct.stroke();
//眼睛
ct.beginPath();
ct.strokeStyle = " #BDBDBD";

ct.arc(141, 67, 14, 0 * Math.PI, 2.5 * Math.PI);

ct.stroke();
ct.beginPath();
ct.strokeStyle = "#000000";

ct.arc(136, 64, 6, 0 * Math.PI, 2.5 * Math.PI);
ct.stroke();

ct.beginPath();
ct.strokeStyle = " #BDBDBD";

ct.arc(170, 88, 14, 0 * Math.PI, 2.5 * Math.PI);
ct.stroke();
ct.beginPath();
ct.strokeStyle = "#000000";
ct.fillStyle = "#FF0000";
ct.arc(165, 87, 6, 0 * Math.PI, 2.5 * Math.PI);
ct.stroke();

// 粉红嘴腮
ct.beginPath();

ct.strokeStyle = " #CD8C95";
ct.arc(178, 147, 20, 0 * Math.PI, 2.5 * Math.PI);
ct.stroke();

//身体
ct.beginPath();
ct.strokeStyle = "red";
ct.moveTo(195, 245);
ct.quadraticCurveTo(215, 215, 244, 410);
ct.moveTo(244, 410);
ct.quadraticCurveTo(244, 410, 38, 410);
ct.moveTo(38, 410);
ct.quadraticCurveTo(11, 410, 76, 251);
ct.stroke();

//两只手

ct.beginPath();
ct.strokeStyle = "pink";
ct.moveTo(58, 294);
ct.quadraticCurveTo(50, 288, 12, 238);
ct.moveTo(56, 300);
ct.quadraticCurveTo(56, 300, 16, 260);
ct.lineTo(3, 269);
ct.lineTo(11, 250);
ct.lineTo(3, 228);
ct.lineTo(15, 241);
ct.stroke();
//右手
ct.beginPath();
ct.moveTo(223, 292);
ct.quadraticCurveTo(266, 288, 287, 271);
ct.moveTo(287, 271);
ct.quadraticCurveTo(236, 233, 279, 245);
ct.moveTo(279, 245);
ct.quadraticCurveTo(255, 200, 295, 247);
ct.moveTo(295, 247);
ct.quadraticCurveTo(288, 200, 306, 226);
ct.moveTo(306, 226);
ct.quadraticCurveTo(311, 250, 308, 248);
ct.moveTo(308, 248);
ct.quadraticCurveTo(344, 200, 334, 245);
ct.moveTo(334, 245);
ct.quadraticCurveTo(311, 280, 300, 280);
ct.moveTo(300, 280);
ct.quadraticCurveTo(311, 280, 224, 303);
ct.stroke();
ct.beginPath();
ct.moveTo(94, 409);
ct.quadraticCurveTo(94, 409, 96, 451);
ct.moveTo(96, 451);
ct.quadraticCurveTo(53, 429, 56, 461);
ct.moveTo(56, 461);
ct.quadraticCurveTo(56, 461, 107, 464);
ct.lineTo(106, 409);
ct.moveTo(183, 411);
ct.lineTo(182, 447);
ct.quadraticCurveTo(124, 434, 136, 464);
ct.lineTo(196, 463);
ct.lineTo(195, 409);
ct.stroke();
ct.beginPath();
ct.lineWidth = "7";
ct.strokeStyle = "pink";
ct.lineCap = "round";
ct.moveTo(238, 360);
ct.quadraticCurveTo(266, 380, 267, 360);
ct.quadraticCurveTo(254, 330, 250, 380);
ct.quadraticCurveTo(254, 420, 290, 369);
ct.stroke();
