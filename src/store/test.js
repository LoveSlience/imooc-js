function inherit(p) {
	if(p === null) throw TypeError();
	if(Object.create()) {
		return Object.create(p);
	}
	var t = typeof p;
	if(p !== 'function' && p !== 'object') throw TypeError();
	function f() {};
	f.prototype = p;
	return new f();
}

function Promise(exector) {
	var self = this;
	self.status = 'pending';
	self.data = undefined;
	self.onResolvedCallback = [];
	self.onRejectedCallback = [];
	exector(resolve, reject);

	function resolve(value) {
		if(self.status === 'pending') {
			self.status = 'resolved';
			self.data = value;
			for(var i = 0; i < self.onResolvedCallback.length; i++) {
				self.onResolvedCallback[i](value);
			}
		}
	}

	function reject(reason) {
		if(self.status === 'pending') {
			self.status = 'rejected';
			self.data = reason;
			for(var i = 0; i < self.onRejectedCallback.length; i++) {
				self.onRejectedCallback[i](reason);
			}
		}
	}

	try {
		exector(resolve, reject);
	}catch(e) {
		reject(e)
	}

}


Promise.prototype.then = function(onResolved, onRejected) {
	var self = this;
	var promise2;

	onResolved = typeof onResolved === 'function' ? onResolved : function(v) {};
	onRejected = typeof onRejected === 'function' ? onRejected : function(r) {};

	if(self.status === 'resolved') {
		return promise2 = new Promise(function(resolve, reject) {
			try {
				var x = onResolved(self.data)
				if(x instanceof Promise) {
					x.then(resolve, reject);
				}
			}catch(e) {
				reject(e)
			}
		})
	}

	if(self.status === 'rejected') {
		return promise2 = new Promise(function(resolve, reject) {
			try {
				var x = onRejected(self.data)
				if(x instanceof Promise) {
					x.then(resolve, reject)
				}
			}catch(e) {
				reject(e)
			}
		})
	}

	if(self.status === 'pending') {
		return promise2 = new Promise(function(resolve, reject) {
			self.onResolvedCallback.push(function(value) {
				try {
					var x = onResolved(self.data)
					if(x instanceof Promise) {
						x.then(resolve, reject)
					}
				}catch(e) {
					reject(e)
				}
			})

			self.onRejectedCallback.push(function(value) {
				try {
					var x = onRejected(self.data);
					if(x instanceof Promise) {
						x.then(resolve, reject)
					}
				}catch(e) {
					reject(e)
				}
			})
		}) 
	}
}

Promise.prototype.catch = function(onRejected) {
	return  this.then(null, onRejected)
}



















