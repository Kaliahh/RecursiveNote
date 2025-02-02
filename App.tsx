import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';



async function createDb() {

  // Test if the database is created

  const db = await SQLite.openDatabaseAsync('database');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, name TEXT);
    INSERT INTO notes (name) VALUES ('this is a test');  
  `)

  const getResult = await db.getAllAsync('SELECT * FROM notes');

  console.log(getResult);
}

async function deleteDb() {
  const db = await SQLite.openDatabaseAsync('database');

  await db.runAsync('DROP TABLE notes');
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text onPress={createDb}>Create db</Text>
      <Text />
      <Text onPress={deleteDb}>Delete db</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
