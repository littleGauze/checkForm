(function($){
	$.extend({
		//表单验证
		initCheck: function(options){
			
			var tipText = {
				'req': '该项为必填项！',
				'cpass': '两次密码不一致',
				'email': '请输入正确的邮箱格式！',
				'tel': '请输入正确的电话号码！',
				'qq': '请输入正确的QQ号码！',
				'idcard': '请输入正确的身份证号码!',
				'url': '请输入正确的URL地址,必须以http://、https://或ftp://开头!',
				'domain': '请输入正确的域名!',
				'passgt6': '密码必须大于6个字符!'
			};
			
			if(options){
				tipText = $.extend(tipText, options);
			}
			
			//限制输入
			function inputLimit(reg, fullReg, target, e){
				var reg = new RegExp(reg),
					fullReg = new RegExp(fullReg, 'ig'),
					val = target.value;
	
				if(!reg.test(e.key)){
					if(!reg.test(val.charAt(val.length-1))){
						val = val.slice(0, -1);
					}
					val = val.replace(fullReg, '');
					target.value = val;
				}
			}
			
			//只允许输入数字和-
			$("input[telOnly]").keyup(function(e){
				inputLimit('\\d|-', '[^\\d-]+', this, e);
			});
			
			//只允许输入数字
			$("input[numOnly]").keyup(function(e){
				inputLimit('\\d', '[^\\d]+', this, e);
			});
			
			//将为空的验证提出来
			function checkEmpty(target){
				var val = $.trim(target.value),
	        		$this = $(target),
	        		preTips;
	        	
	        	preTips = $this.attr('req');
	        	tips = preTips || tipText.req;
	        	if(!val){
	        		$this.next().text(tips);
	        		$this.attr('invalid', 'req');
	        		target.focus();
	        	}else{
	        		$this.next().text('');
	        		$this.removeAttr('invalid');
	        	};
	        	return false;
			}
			
			//将正则验证的提出来(太多相同代码了)
			function checkReg(type, reg, target){
				var val = $.trim(target.value),
					$this = $(target),
					reg = new RegExp(reg),
					tip,req;
				tip = $this.next();
				
				if(val && !reg.test(val)){
					tip.text(tipText[type]);
					$this.attr('invalid', type);
				}else if($this.attr('req') !== undefined){
					checkEmpty(target);
				}else{
					tip.text('');
	        		$this.removeAttr('invalid');
				}
			}
			
			//验证为空 有req的[input,password,textarea]
			$('input[req],textarea[req],password[req]').blur(function(){
				checkEmpty(this);
			});
			
			//验证两次密码是否一致 单独验证
			$("input[cpass]").blur(function(e){
            	var val = $.trim(this.value),
            		$this = $(this),
            		pname,pass,cpass,tip;
            	pname = $this.attr('cpass');
            	pass = $("input[name="+ pname +"]").val();
            	tip = $this.next();
            	cpass = $.trim(this.value);
            	
            	if(pass != cpass){
	        		$this.attr('invalid', 'cpass');
            		tip.text(tipText.cpass);
            	}else if($this.attr('req') !== undefined){
					checkEmpty(this);
				}else{
	        		$this.removeAttr('invalid');
            		tip.text('');
            	}
            	
            });
			
			//验证邮箱
			$("input[email]").blur(function(e){
				checkReg('email', '\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*', this);
			});
			
			//验证电话号码和手机号码
			$('input[tel]').blur(function(e){
				checkReg('tel', '^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$|^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$', this);
			});
			
			//验证qq号
			$('input[qq]').blur(function(e){
				checkReg('qq', '[1-9][0-9]{4,}', this);
			});
			
			//验证身份证
			$("input[idcard]").blur(function(e){
				checkReg('idcard', '(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)', this);
			});
			
			//验证URL
			$("input[url]").blur(function(e){
				checkReg('url', '((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?', this);
			});
			
			//验证域名
			$("input[domain]").blur(function(e){
				checkReg('domain', '^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$', this);
			})
			
			//密码大于6位数
			$("input[passgt6]").blur(function(e){
				checkReg('passgt6', '.{6,}', this);
			});
			
			return {
				checkForm: function(form){
					var reqs = $(form).find('input[req]:not(:hidden)'),
						invalid,target,type,i;
					
					for(i=0; i<reqs.length; i++){
						if(!reqs[i].value){
							$(reqs[i]).focus().blur().focus();
							return false;
							break;
						}
					}
					
					invalid = $(form).find('input[invalid]');
					
					if(invalid.length > 0){
						target = $(invalid[0]);
						type = target.attr('invalid');
						
						target.blur().focus();
						return false;
					}
					
					return true;
				}
			};
		}
	});
	
})(jQuery);