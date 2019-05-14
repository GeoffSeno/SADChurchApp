import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });
var SQLite = require('react-native-sqlite-storage')

export function createDB() {
	db.transaction(function(txn) {
	  txn.executeSql(
	    "SELECT name FROM sqlite_master WHERE type='table' AND name='household_t'",
	    [],
	    function(tx, res) {
	      console.log('item:', res.rows.length);
	      if (res.rows.length == 0) {
	        txn.executeSql('DROP TABLE IF EXISTS household_t', []);
	        txn.executeSql(
	          'CREATE TABLE IF NOT EXISTS household_t(household_id INTEGER PRIMARY KEY AUTOINCREMENT, household_number INT(10), household_street VARCHAR(50), household_barangay VARCHAR(50), bec_number INT(10), has_medical_equipment INT(1), allow_victims INT(1), allow_evacuation INT(1), date_added DATE)',
	          []
	        );
	        txn.executeSql('DROP TABLE IF EXISTS physical_asset_t', []);
	        txn.executeSql(
	          'CREATE TABLE IF NOT EXISTS physical_asset_t(asset_id INTEGER PRIMARY KEY AUTOINCREMENT, household_id INT(10), asset_type VARCHAR(20), asset_kind VARCHAR(20))',
	          []
	        );
	        txn.executeSql('DROP TABLE IF EXISTS pet_t', []);
	        txn.executeSql(
	          'CREATE TABLE IF NOT EXISTS pet_t(pet_id INTEGER PRIMARY KEY AUTOINCREMENT, household_id INT(10), pet_name VARCHAR(20), pet_type VARCHAR(20), is_dangerous VARCHAR(3))',
	          []
	        );
	      }
	    }
	  );
	});
}

export function deleteDB(){
	SQLite.deleteDatabase({name: 'UserDatabase.db'});
}

export function clearData(){
	db.transaction(tx => {
	  tx.executeSql('DELETE FROM household_t')
	});
}

function jsonHouseT(){
	const link = "http://192.168.1.2/insert_household_t.php";
	db.transaction(tx => {
	  tx.executeSql('SELECT * FROM household_t', [], (tx, results) => {
	    for (let i = 0; i < results.rows.length; ++i) {
	      var household_number = results.rows.item(i).household_number;
	      var household_street = results.rows.item(i).household_street;
	      var household_barangay = results.rows.item(i).household_barangay;
	      var bec_number = results.rows.item(i).bec_number;
	      var has_medical_equipment = results.rows.item(i).has_medical_equipment;
	      var allow_victims = results.rows.item(i).allow_victims;
	      var allow_evacuation = results.rows.item(i).allow_evacuation;
	      var date_added = results.rows.item(i).date_added;
	      fetch(link, {
	        method: 'post',
	        header: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	          address_number: household_number,
	          address_street: household_street,
	          address_barangay: household_barangay,
	          bec_number: bec_number,
	          has_medical_equipment: has_medical_equipment,
	          allow_victims: allow_victims,
	          allow_evacuation: allow_evacuation,
	          registration_date: date_added
	        })
	      })
	      .then((response) => response.json)
	        .then((responseJson) =>{
	          console.log("SENT");
	        })
	        .catch((error) =>{
	          console.error(error);
	        })
	    }
	  });
	});
}

function jsonPhysAssT(){
	const link = "http://192.168.1.2/insert_physical_asset_t.php";
	db.transaction(tx => {
	  tx.executeSql('SELECT * FROM physical_asset_t', [], (tx, results) => {
	    for (let i = 0; i < results.rows.length; ++i) {
	      var household_id = results.rows.item(i).household_id;
	      var asset_type = results.rows.item(i).asset_type;
	      var asset_kind = results.rows.item(i).asset_kind;
	      fetch(link, {
	        method: 'post',
	        header: {
	          'Accept': 'application/json',
	          'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	          household_id: household_id,
	          asset_type: asset_type,
	          asset_kind: asset_kind,
	        })
	      })
	      .then((response) => response.json)
	        .then((responseJson) =>{
	          console.log("SENT");
	        })
	        .catch((error) =>{
	          console.error(error);
	        })
	    }
	  });
	});
}

export function sendData(){
	jsonHouseT();
	jsonPhysAssT();
}