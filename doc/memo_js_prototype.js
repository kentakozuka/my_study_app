/*
 * 全ての関数オブジェクトはprototypeというプロパティを保持しています。
 *関数オブジェクトを定義した直後では、
 *このprototypeには何もプロパティを持たないシンプルなオブジェクトを参照していますが、
 *別のオブジェクトを代入したり、新たなプロパティを設定したりする事が可能です。
 *
 *　そして、その関数オブジェクトをコンストラクタとして生成されたオブジェクトは、
 *コンストラクタのprototypeプロパティに代入されているオブジェクトに対し、暗黙の参照を持つのです。
 *つまりprototypeが指すオブジェクトがプロトタイプとなる
*/

var Animal = {
	//コンストラクタ
	create: function(type) {
		//プロトタイプを指定してインスタンスを生成
		var animal = Object.create(Animal.prototype);
		animal.type = type;
		return animal;
	},
	isAnimal: function(obj, type) {
		if(!Animal.prototype.isPrototypeOf(obj)) {
			return false;
		}
		return type ? obj.type === type : true;
	},
	//オブジェクトリテラルで生成されたオブジェクトはObject.prototypeを継承している
	prototype: {
	}
};

var Dog = {
	//コンストラクタ
	create: function() {
		//プロトタイプを指定してインスタンスを生成
		var dog = Object.create(Dog.prototype);
		//オブジェクトの結合
		//すべてのプロパティの値を、ターゲット オブジェクトへコピー
		Object.assign(dog, Animal.create("dog"));
		return dog;
	},
	isDog: function(obj) {
		return Animal.isAnimal(obj, "dog");
	},
	prototype : {
		bark: function() {
			console.log("ruff, ruff");
		},
	}
};

//プロトタイプを結合する
Object.setPrototypeOf(Dog.prototype, Animal.prototype);

var GoldenRetriever = {
	//コンストラクタ
	create: function(name) {
		//プロトタイプを指定してインスタンスを生成
		var gr = Object.create(GoldenRetriever.prototype);
		//オブジェクトの結合
		//すべてのプロパティの値を、ターゲット オブジェクトへコピー
		Object.assign(gr, Dog.create("Golden Retriever"));
		gr.name = name;
		return gr;
	},
	isGoldenRetriever: function(obj) {
		return Animal.isAnimal(obj, "dog");
	},
	prototype : {
		print: function() {
			console.log("This dog " + this.name + " is a " + this.breed);
		}
	}
};
//プロトタイプを結合する
Object.setPrototypeOf(GoldenRetriever.prototype, Dog.prototype);

var myPet = GoldenRetriever.create('Harry');
myPet.print();
myPet.bark();

/*
 * 読み取り評価の時は、暗黙の参照をたどるのですが、代入やdelete演算子は、たどらないのです。
 * 従って、objA.prop1 = 100;を行った時点で、objAそのものにprop1というプロパティが新たに作られ、
 * そこに100が代入されるのです。よってConstructor.prototype.prop1の値は変わらないままとなります。
 */
function Constructor() {}
Constructor.prototype.prop1 = 30;

var objA = new Constructor();
var objB = new Constructor();

console.log(objA.prop1)	// 30 と表示される。
console.log(objB.prop1)	// 30 と表示される。

objA.prop1 = 100;

console.log(objA.prop1)	// 100
console.log(objB.prop1)	// 30


/* プロトタイプチェーン
 * コンストラクタのprototypeには、オブジェクトも代入できますので、
 * prototypeに代入したオブジェクトが別のオブジェクトをプロトタイプにしている事もあります。
 * そもそも全てのオブジェクトはObject.prototypeを暗黙的に参照しています。
 * こうしたプロトタイプの連鎖のことをプロトタイプチェーンと呼びます。
 */
var objA = new Object();
objA.prop1 = 10;
function Func1() {}
//Func1のプロトタイプにobjAを代入
Func1.prototype = objA;

var objB = new Func1();
//Func2のプロトタイプにobjBを代入
function Func2() {}
Func2.prototype = objB;

var objC = new Func2();

console.log(objC.prop1);       // 10 と評価される。
