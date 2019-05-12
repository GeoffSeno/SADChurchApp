let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase({name: 'test.db', createFromLocation: '~sqliteexample.db'});

export const getMat = () => {
	var name = "as";
	
	db.transaction((tx) => {
	  tx.executeSql('SELECT * FROM pet WHERE owner=?', ['Jane'], (tx, results) => {
	      var len = results.rows.length;
	      if(len > 0) {
	        var row = results.rows.item(0);
	        name = row.petname;
	      }
	    });
	});

	return name;
}
