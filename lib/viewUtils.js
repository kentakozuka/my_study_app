/**
 * POSTを送信する関数
 * @param アクション
 * @param 送信したいinput分のnameとvalueプロパティを持った配列
**/
function postForm(action, inputArray){

    var form = document.createElement( 'form' );
    document.body.appendChild( form );

	//引数のArrayの長さ分inputを登録する
	for(var i=0; i < inputArray.length; i++) {
    	var input = document.createElement( 'input' );
    	input.setAttribute( 'type',		'hidden' );
    	input.setAttribute( 'name',		inputArray[i].name );
    	input.setAttribute( 'value',	inputArray[i].value );
    	form.appendChild( input );
	}

    form.setAttribute('action',	action );
    form.setAttribute('method',	'post' );

    form.submit();
}
