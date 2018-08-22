//创建物理边界
cc.Class({
    extends: cc.Component,

    properties: {
        size: cc.size(0, 0)
    },

    // use this for initialization
    onLoad: function () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;

        // physicsManager.debugDrawFlags =
        //     // 0;
        //     // cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit
        //     ;

        let width = this.size.width || this.node.width;
        let height = this.size.height || this.node.height;
        cc.log("width=%d,height=%d", width, height);
        let node = new cc.Node();

        let body = node.addComponent(cc.RigidBody);
        body.type = cc.RigidBodyType.Static;

        // this._addBound(node, 0, height / 2, width, 20);
        // this._addBound(node, 0, -height / 2, width, 20);
        this._addBound(node, -width / 2, 0, 20, height);
        this._addBound(node, width / 2, 0, 20, height);

        node.parent = this.node;
    },

    _addBound(node, x, y, width, height) {
        let collider = node.addComponent(cc.PhysicsBoxCollider);
        collider.offset.x = x;
        collider.offset.y = y;
        collider.size.width = width;
        collider.size.height = height;
    }
});
