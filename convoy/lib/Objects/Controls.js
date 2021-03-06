function Controls(eng, overlay){

	this.cash = 1000;
	this.population = 0;


	overlay.dom.addEventListener("click",function(){
		var sprite = eng.convoy.getSelected(eng.inputs.mouse.position.x,eng.inputs.mouse.position.y);
		eng.dlg.invoke(sprite);
	});

	this.buy = function(item){

		var cost = window[item].cost;

		if(this.cash >= cost){
			this.charge(cost);
			//if has enough money
			eng.convoy.add(new window[item](eng.scene,eng.layer));
			this.updateCash();
		}else{
			console.log("not enough cash");

		}
	}

	this.repair = function(sp){
		if(this.canRepair(sp)){
			this.charge(this.getRepairCost(sp));
			sp.hp = sp.maxhp;
		}else{
			console.log("Cannot afford action");
		}
	}
	this.canRepair = function(sp){

		return (this.cash >= this.getRepairCost(sp));
	}
	this.getRepairCost = function(sp){
		return (sp.maxhp-sp.hp)*2;
	}




	this.upgrade = function(sp){
		if(this.canUpgrade(sp)){
			this.charge(this.getUpgradeCost(sp));
			sp.upgrade();
		}else{
			console.log("Cannot afford action");
		}
	}
	this.canUpgrade = function(sp){
		if(sp.level==1 && this.population < 100) return false;
		if(sp.level==2 && this.population < 300) return false;
		if(sp.level==3) return false;
		return (this.cash >= this.getUpgradeCost(sp));
	}
	this.getUpgradeCost = function(sp){
		var lvl = sp.level+1;
		if(lvl==4) return -1;
		return sp.levels[lvl].cost;
	}
	this.getUpgradeIssue = function (sp){
		var lvl = sp.level+1;
		if(lvl==2 && this.population < 100) return "Need a population of 100 to use level two strutures.";
		if(lvl==3 && this.population < 300) return "Need a population of 300 to use level three strutures.";
		if(lvl==4) return "This vehicle is already fully upgraded.";
		if(this.cash < this.getUpgradeCost(sp)){
			return "Cannot afford upgrade, cost: $"+this.getUpgradeCost(sp);
		}
	}






	this.charge = function(cost){
		this.cash -= cost;
		this.updateOptions();
	}
	this.fund = function(cost){
		this.cash += cost;
		this.updateOptions();
	}

	this.updatePopulation = function(change){
		this.population += change;

		document.getElementById('pop').innerHTML = this.population;
	}


	this.updateCash = function(){
		document.getElementById('cash').innerHTML = '$'+this.cash;
	}

	this.updateOptions = function(){
		//Grey out / un grey out purchase optioons

		var greenStyle = 'solid 2px #238E23';
		var redStyle = 'solid 2px #ff0000'

		var res = document.getElementById('buyresidence');
		(Residence.cost <= this.cash) ? res.style.border = greenStyle : res.style.border = redStyle;
		
		var can = document.getElementById('buycannon');
		(Cannon.cost <= this.cash) ? can.style.border = greenStyle : can.style.border = redStyle;
		
		var tur = document.getElementById('buyturret');
		(Turret.cost <= this.cash) ? tur.style.border = greenStyle : tur.style.border = redStyle;


		document.getElementById('cash').innerHTML = '$'+this.cash;
	}

	
}