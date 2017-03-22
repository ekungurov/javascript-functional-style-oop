const GENERAL_AUTO_MAX_SPEED = 100;
const CABRIO_MAX_SPEED = 175;

let automobile = function() {
    let me = {};

    let _speed = 0;
    let _maxSpeed = undefined;

    _publicAPI();
    _setMaxSpeed(GENERAL_AUTO_MAX_SPEED);
    return me;

    function _setMaxSpeed(speedValue) {
        _maxSpeed = speedValue;
    }

    function _publicAPI() {
        Object.assign(me, {
            getSpeed: function() {
                return _speed;
            },
            setSpeed: function(speedValue) {
                if (speedValue <= _maxSpeed) {
                    _speed = speedValue;
                } else {
                    throw Error("speed is too big");
                }
            },
            // there are no protected methods, so I had to make this public
            setMaxSpeed: function(speedValue) {
                _setMaxSpeed(speedValue);
            }
        });
    }
}

let cabriolet = (function() {

    // private static field
    let _speedLimitWithoutRoof = undefined;

    // public static method
    cabriolet.setSpeedLimitWithoutRoof = function(speedValue) {
        _speedLimitWithoutRoof = speedValue;
    }

    // non-static things go further
    function cabriolet() {
        let me = automobile();
        let _super = Object.assign({}, me);

        let _roofCollapsed = false;

        _publicAPI();
        _super.setMaxSpeed(CABRIO_MAX_SPEED);
        return me;

        function _publicAPI() {
            Object.assign(me, {
                collapseRoof: function() {
                    _roofCollapsed = true;
                },
                raiseRoof: function() {
                    _roofCollapsed = false;
                },
                setSpeed: function(speedValue) {
                    if (_roofCollapsed && speedValue > _speedLimitWithoutRoof) {
                        throw Error("too fast, please raise the roof");
                    } else {
                        _super.setSpeed(speedValue);
                    }
                }
            });
        }
    };

    return cabriolet;
}) ();
