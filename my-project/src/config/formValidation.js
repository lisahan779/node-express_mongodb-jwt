const formValidation = {
    mobile: (rule, value, callback) => {
        const reg = /^1(3|4|5|7|8)\d{9}$/;
        if (!reg.test(value)) {
            callback('请输入正确的手机号')
        } else {
            callback()
        }
    },
    // 邮编验证
    postcode: (rule, value, callback) => {
        const reg = /^[0-9]{6}$/;
        if (!reg.test(value)) {
            callback("请输入正确的邮编")
        } else {
            callback();
        }
    },
    // qq验证
    qq: (rule, value, callback) => {
        var qqPattern = /^[1-9][0-9]{4,10}$/;
        if (!qqPattern.test(value)) {
            callback("请输入正确的qq号")
        } else {
            callback();
        }
    },
    // 车牌号
    plateNum: (rule, value, callback) => {
        if (value == "" || value == undefined) {
            callback()
            return false
        }
        var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
        //输出 true
        if (value.length == 7) {
            if (!xreg.test(value.substr(0, 2))) {
                callback('请输入正确的车牌号码')
            } else {
                callback()
            }
        } else if (value.length == 8) {
            if (!xreg.test(value.substr(0, 2))) {
                callback('请输入正确的车牌号码')
            } else {
                callback()
            }
        } else {
            callback('请输入正确的车牌号码')
        }
    },
    // 年龄：
    age: (rule, value, callback) => {
        const reg = /^[0-9]*[1-9][0-9]*$/
        if (!(reg.test(value) || (Number(value) === 0))) {
            callback('请输入大于等于0的整数')
        } else {
            callback()
        }
    },
    // 密码
    password: (rule, value, callback) => {
        const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
        if (!(reg.test(value))) {
            callback('最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符')
        } else {
            callback()
        }
    },
    // 身份证
    id: (rule, value, callback) => {
        const cP = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!cP.test(value)) {
            callback("身份证有误")
        } else {
            callback()
        }
    }

}

export default formValidation