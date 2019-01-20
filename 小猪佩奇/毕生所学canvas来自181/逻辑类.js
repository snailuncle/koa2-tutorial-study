function ABwaitFor(fun, period, timeout) {
    period = period || 200;
    var time = new Date().getTime();
    while (!fun()) {
        if (timeout && new Date().getTime() - time >= timeout) {
            return false;
        };
        sleep(period);
    };
    return true;
};

function ABwaitForActivity(activity, timeout, period) {
    period = period || 200;
    var time = new Date().getTime();
    while (global.currentActivity() != activity) {
        if (timeout && new Date().getTime() - time >= timeout) {
            return false;
        };
        sleep(period);
    };
    return true;
};

function ABwaitForPackage(packageName, timeout, period) {
    period = period || 200;
    var time = new Date().getTime();
    while (global.currentPackage() != packageName) {
        if (timeout && new Date().getTime() - time >= timeout) {
            return false;
        };
        sleep(period);
    };
    return true;
};