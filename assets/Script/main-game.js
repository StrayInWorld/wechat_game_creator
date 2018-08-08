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
        arrow: cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
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
            this.scheduleNum.node.opacity = 0;
            this.scheduleNum.node.scale = 0.1;
        }, this);
        let action2 = cc.spawn(cc.scaleTo(0.5, 1.0), cc.fadeIn(0.5));
        let action3 = cc.fadeOut(0.5);

        let doActionNum = 0;
        this.scheduleNum.string = "3";
        this.scheduleNum.node.runAction(cc.sequence(
            action1, action2, action3,
            cc.callFunc(function () {
                doActionNum += 1;
                if (doActionNum === 1) {
                    this.scheduleNum.string = "2"
                }
                else if (doActionNum === 2) {
                    this.scheduleNum.string = "1"
                    //显示黑色方块
                    this.dispatchSquare.opacity = 255;
                }
                else if (doActionNum === 3) {
                    //开启发射按钮事件回调
                    let dispatchBtnComp = this.dispatchBtn.getComponent("dispatch-btn");
                    this.dispatchBtn.on("touchstart", function (event) {
                        dispatchBtnComp.lineMaskWidget.left = 0;
                        dispatchBtnComp.isChangeLeft = true;
                        dispatchBtnComp.isDispatch = true;
                    }, this);
                    //显示箭头，并监听箭头触摸事件
                    this.arrow.runAction(cc.fadeIn(3));
                    this.node.on("touchmove", function (event) {
                        let touch = event.touch;
                        // // let startPos = cc.v2(touch.getStartLocation().x, touch.getStartLocation().y);
                        let startPos=cc.v2(touch.getPreviousLocation().x, touch.getPreviousLocation().y);
                        let moveRad = startPos.signAngle(cc.v2(touch.getLocation().x, touch.getLocation().y));
                        let moveRotation = moveRad * 360 / Math.PI;
                        cc.log("move event", moveRotation);

                        this.arrow.rotation += moveRotation;
                    }, this);
                    //创建边缘方块
                    SquareTool.createRandomSquare(this.square, -260);
                }
            }, this)
        ).repeat(3));
    },

    update(dt) {
        let hasSchedule = cc.director.getScheduler().isScheduled(this.createWhiteSquare, this);
        let isDispatch = this.dispatchBtn.getComponent("dispatch-btn").isDispatch;
        //开启中间方块降落计时器
        if (isDispatch && !hasSchedule) {
            this.schedule(this.createWhiteSquare, 3.5, cc.macro.REPEAT_FOREVER);
        }
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
