var xiaofeng = {
    name: '小红',
    birth: 1990,
    school: 'No.1 Middle School',
    height: 1.70,
    /**
     * Javascript 就是用一个变量名表示，
     * 变量名是大小写英文、数字、$和_的组合，且不能用数字开头，也不能是Javascript的关键字
     */
    'middle_school': 'No.1 Middle School',
    weight: 65,
    score: null
};

var middle_school = '12121';

xiaofeng['middle-school'];//'No.1 Middle School'
xiaofeng['name'];//'小红'
xiaofeng.name;//'小红'

xiaofeng.age;//undefined;
xiaofeng.age = 18;//新增age属性
xiaofeng.age;//18
delete xiaofeng.age;//删除age属性
xiaofeng.age;//undefined
delete xiaofeng['name'];//删除name属性
xiaofeng.name;//undefined
delete xiaofeng.school;//删除一个不存在的school属性也不会报错

//如果我们要检测xiaofeng是否拥有有一个属性，可以用in操作符
xiaofeng = {
    name: '小明'
};

'name' in xiaofeng;//true
'grade' in xiaoming;//false

/**
 * 不过要小心，如果in判断一个属性存在，这个属性不一定是xiaofeng的，
 * 它可能是xiaofeng继承得到的：
 */

/**
 * 因为toString定义在object对象中，而所有对象最终都会在原型链
 * 上指向object，所以xiaofeng也拥有toString属性。
 */
'toString' in xiaofeng;

xiaofeng.hasOwnProperty();//true




