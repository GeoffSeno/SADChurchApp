import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'dbMk1.db' });
var SQLite = require('react-native-sqlite-storage')

//Insert to skills
function insertSkill(id, name) {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO skill_t (person_id, skill_name) VALUES (?,?)',
      [id, name],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {
          Alert.alert( 'Success', 'Person added!',
            [
              {text: 'Ok', onPress: () => that.props.navigation.navigate('Home')},
            ],
            { cancelable: false }
          );
        } else {
          alert('Registration Failed');
        }
      }
    );
  });
}

//Gets the just added person's ID first then inserts to skills table
function addSkill(name){
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM person_t ORDER BY person_id DESC LIMIT 1', [], (tx, results) => {
      var id;
      for (let i = 0; i < results.rows.length; ++i) {
        id = results.rows.item(i).person_id;
        insertSkill(id, name);
      }
    });
  });
}

export function skillChecker(skillData){
  if (skillData['Doctor'] == true) {
    addVol("Doctor");
  }
}

//Insert to volunteer role
function insertVol(id, preference){
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO volunteer_role_t (person_id, preference) VALUES (?,?)',
      [id, preference],
      (tx, results) => {
        console.log('Results', results.rowsAffected);
        if (results.rowsAffected > 0) {

        } else {
          alert('Registration Failed');
        }
      }
    );
  });
}

//Gets the just added person's ID first then inserts to volunteer_role table
function addVol(preference){
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM person_t ORDER BY person_id DESC LIMIT 1', [], (tx, results) => {
      var id;
      for (let i = 0; i < results.rows.length; ++i) {
        id = results.rows.item(i).person_id;
        insertVol(id, preference);
      }
    });
  });
}

export function volunteerChecker(volData){
  if (volData['CommsVol'] == true) {
    addSkill("Communications");
  }
}