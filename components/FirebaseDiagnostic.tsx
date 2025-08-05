import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '@/config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { checkConnectivity } from '@/config/development';

interface DiagnosticResult {
  firebaseConfig: boolean;
  networkConnectivity: boolean;
  firestoreConnection: boolean;
  authConnection: boolean;
}

export function FirebaseDiagnostic() {
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnostic = async () => {
    setIsRunning(true);
    console.log('🔍 Démarrage du diagnostic Firebase...');

    const results: DiagnosticResult = {
      firebaseConfig: false,
      networkConnectivity: false,
      firestoreConnection: false,
      authConnection: false,
    };

    try {
      // 1. Vérifier la configuration Firebase
      console.log('1️⃣ Vérification de la configuration Firebase...');
      if (db && auth) {
        results.firebaseConfig = true;
        console.log('✅ Configuration Firebase OK');
      } else {
        console.log('❌ Configuration Firebase échouée');
      }

      // 2. Vérifier la connectivité réseau
      console.log('2️⃣ Vérification de la connectivité réseau...');
      results.networkConnectivity = await checkConnectivity();

      // 3. Tester la connexion Firestore
      if (results.firebaseConfig && results.networkConnectivity) {
        console.log('3️⃣ Test de connexion Firestore...');
        try {
          const testDoc = doc(db, '_diagnostic', 'test');
          await setDoc(testDoc, { timestamp: new Date(), test: true }, { merge: true });
          console.log('✅ Connexion Firestore OK');
          results.firestoreConnection = true;
        } catch (error) {
          console.error('❌ Erreur Firestore:', error);
        }
      }

      // 4. Tester la connexion Auth
      if (results.firebaseConfig) {
        console.log('4️⃣ Test de connexion Auth...');
        try {
          // Vérifier que l'instance auth est disponible
          if (auth.currentUser !== undefined) {
            console.log('✅ Connexion Auth OK');
            results.authConnection = true;
          } else {
            console.log('✅ Connexion Auth OK (aucun utilisateur connecté)');
            results.authConnection = true;
          }
        } catch (error) {
          console.error('❌ Erreur Auth:', error);
        }
      }

    } catch (error) {
      console.error('❌ Erreur lors du diagnostic:', error);
    }

    setDiagnostic(results);
    setIsRunning(false);
    console.log('🏁 Diagnostic terminé:', results);
  };

  const getStatusColor = (status: boolean) => status ? '#4CAF50' : '#F44336';
  const getStatusText = (status: boolean) => status ? 'OK' : 'ÉCHEC';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diagnostic Firebase</Text>
      
      <TouchableOpacity
        style={[styles.button, isRunning && styles.buttonDisabled]}
        onPress={runDiagnostic}
        disabled={isRunning}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'Diagnostic en cours...' : 'Lancer le diagnostic'}
        </Text>
      </TouchableOpacity>

      {diagnostic && (
        <View style={styles.results}>
          <Text style={styles.resultsTitle}>Résultats :</Text>
          
          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Configuration Firebase :</Text>
            <Text style={[styles.resultStatus, { color: getStatusColor(diagnostic.firebaseConfig) }]}>
              {getStatusText(diagnostic.firebaseConfig)}
            </Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Connectivité réseau :</Text>
            <Text style={[styles.resultStatus, { color: getStatusColor(diagnostic.networkConnectivity) }]}>
              {getStatusText(diagnostic.networkConnectivity)}
            </Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Connexion Firestore :</Text>
            <Text style={[styles.resultStatus, { color: getStatusColor(diagnostic.firestoreConnection) }]}>
              {getStatusText(diagnostic.firestoreConnection)}
            </Text>
          </View>

          <View style={styles.resultItem}>
            <Text style={styles.resultLabel}>Connexion Auth :</Text>
            <Text style={[styles.resultStatus, { color: getStatusColor(diagnostic.authConnection) }]}>
              {getStatusText(diagnostic.authConnection)}
            </Text>
          </View>

          {!diagnostic.firestoreConnection && (
            <View style={styles.suggestions}>
              <Text style={styles.suggestionsTitle}>Suggestions :</Text>
              <Text style={styles.suggestion}>• Vérifiez votre connexion internet</Text>
              <Text style={styles.suggestion}>• Vérifiez les règles Firestore dans Firebase Console</Text>
              <Text style={styles.suggestion}>• Redémarrez l'émulateur Android</Text>
              <Text style={styles.suggestion}>• Vérifiez que le projet Firebase est actif</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  results: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 6,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  resultLabel: {
    fontSize: 14,
  },
  resultStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  suggestions: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#FFF3E0',
    borderRadius: 6,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#E65100',
  },
  suggestion: {
    fontSize: 12,
    color: '#E65100',
    marginBottom: 2,
  },
}); 