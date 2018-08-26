let SquareTool = require("SquareTool");

cc.Class({
    extends: cc.Component,

    properties: {
        dispatchSquare: cc.Node,
        whiteSquarePre: cc.Prefab,
        square: cc.Prefab,
        overLine: cc.Node,
        dispatchBtn: cc.Node,
        scheduleNum: cc.Label,
        ball: cc.Node,
        arrow: cc.Node,
        wheel: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.dispatchSquare = cc.find("Canvas/dispatchSquare");
        this.overLine = cc.find("Canvas/overLien");
        this.scheduleNum = cc.find("Canvas/scheduleNum");
        this.scheduleNumLabel = this.scheduleNum.getComponent(cc.Label);
        this.dispatchBtn = cc.find("Canvas/dispatchBtn");
        this.ball = cc.find("Canvas/ball");
        this.ballComp = this.ball.getComponent("BallComp");
        this.arrow = cc.find("Canvas/ball/arrow");
        this.leftSquareMask = cc.find("Canvas/leftSquareMask");
        this.rightSquareMask = cc.find("Canvas/rightSquareMask");
        this.wheel = cc.find("Canvas/wheel");
        this.wheel.active=false;
        this.squareWidget = this.dispatchSquare.getComponent(cc.Widget);
        this.dispatchSquare.opacity = 0;
        this.arrow.opacity = 0;

        //缓存池
        this.whiteSquarePool = new cc.NodePool();
        let whiteSauareNum = 10;
        for (let i = 0; i < whiteSauareNum; i++) {
            let whiteSquare = cc.instantiate(this.whiteSquarePre);
            this.whiteSquarePool.put(whiteSquare);
        }
    },

    start() {
        //倒计时
        let action1 = cc.callFunc(function () {
            this.scheduleNum.opacity = 0;
            this.scheduleNum.scale = 0.1;
        }, this);
        let action2 = cc.spawn(cc.scaleTo(0.5, 1.0), cc.fadeIn(0.5));
        let action3 = cc.fadeOut(0.3);

        let doActionNum = 0;
        this.scheduleNumLabel.string = "3";
        this.scheduleNum.runAction(cc.sequence(
            action1, action2, action3,
            cc.callFunc(function () {
                doActionNum += 1;
                if (doActionNum === 1) {
                    this.scheduleNumLabel.string = "2"
                    //显示黑色方块
                    this.dispatchSquare.opacity = 255;
                }
                else if (doActionNum === 2) {
                    this.scheduleNumLabel.string = "1"
                }
                else if (doActionNum === 3) {
                    //开启发射按钮事件回调
                    let dispatchBtnComp = this.dispatchBtn.getComponent("dispatch-btn");
                    dispatchBtnComp.onTouchEvent();
                    //显示箭头，并监听箭头触摸事件
                    this.arrow.runAction(cc.fadeIn(3));
                    //移动箭头，获取移动的向量
                    // this.onTouchStart();     //点击屏幕直接移动
                    this.onTouchMove();    //屏幕移动
                    // this.onWheelMove();   //转盘移动
                    //创建边缘方块
                    SquareTool.createRandomSquare(this.square, true, -220);
                    //对比高度
                    let leftMaskCompHeight = this.node.convertToWorldSpaceAR(this.leftSquareMask.position).y - this.leftSquareMask.height / 2;  //比较高度
                    let rightMaskCompHeight = this.node.convertToWorldSpaceAR(this.rightSquareMask.position).y - this.rightSquareMask.height / 2;
                    this.ballComp.setMaskCompHeight(leftMaskCompHeight, rightMaskCompHeight);
                }
            }, this)
        ).repeat(3));
    },
    onTouchMove() {
        let dispatchBtnComp = this.dispatchBtn.getComponent("dispatch-btn");
        this.node.on("touchmove", function (event) {
            //设置箭头角度
            let touch = event.touch;
            let startPos = cc.v2(touch.getPreviousLocation());
            let currentPos = cc.v2(touch.getLocation());
            let moveRad = currentPos.signAngle(startPos);
            let moveRotation = moveRad * 180 * 2 / Math.PI;
            // cc.log("move event", -moveRotation);
            this.arrow.rotation += -moveRotation;

            //旋转过后向量
            let radians = (this.arrow.rotation + this.ball.rotation) * Math.PI / 180;
            let v2ByRotate = cc.v2(0, 1).rotate(-radians);
            dispatchBtnComp.velocity = v2ByRotate.normalize();
        }, this);

    },
    onWheelMove() {
        let dispatchBtnComp = this.dispatchBtn.getComponent("dispatch-btn");
        this.wheel.on("touchmove", function (event) {
            //设置箭头角度
            let touch = event.touch;
            if (touch.getDelta().x > 0 || touch.getDelta().y < 0) {
                this.wheel.rotation += 1;
                this.arrow.rotation += 1;
            }
            else {
                this.wheel.rotation -= 1;
                this.arrow.rotation -= 1;
            }

            //旋转过后向量
            let radians = (this.arrow.rotation + this.ball.rotation) * Math.PI / 180;
            let v2ByRotate = cc.v2(0, 1).rotate(-radians);
            dispatchBtnComp.velocity = v2ByRotate.normalize();
        }, this);

    },
    update(dt) {
        //开启中间方块降落计时器        
        // let hasSchedule = cc.director.getScheduler().isScheduled(this.createWhiteSquare, this);
        // let isDispatch = this.dispatchBtn.getComponent("dispatch-btn").isDispatch;
        // if (isDispatch && !hasSchedule) {
        //     this.schedule(this.createWhiteSquare, 3.5, cc.macro.REPEAT_FOREVER);
        // }
    },
    createWhiteSquare() {
        let whiteSquareInPool = null;
        if (this.whiteSquarePool.size() > 0) {
            whiteSquareInPool = this.whiteSquarePool.get(this.whiteSquarePool);
        }
        else {
            whiteSquareInPool = cc.instantiate(this.whiteSquarePre);
        }

        whiteSquareInPool.parent = this.node;
        whiteSquareInPool.y = this.node.height / 2 - 35;
        whiteSquareInPool.opacity = 0;
        let whiteSquateWidget = whiteSquareInPool.getComponent(cc.Widget);
        whiteSquateWidget.left = 290;

        let moveDuration = this.overLine.y - whiteSquareInPool.y

        whiteSquareInPool.runAction(cc.sequence(
            cc.spawn(
                cc.fadeIn(0.5),
                cc.moveBy(5, cc.p(0, moveDuration)),
            ),
            cc.spawn(
                cc.moveBy(0.5, cc.p(0, -whiteSquareInPool.height / 2)),
                cc.fadeOut(0.5)
            ),
            cc.callFunc(function () {
                this.whiteSquarePool.put(whiteSquareInPool);
            }, this)
        ));

    }
});
