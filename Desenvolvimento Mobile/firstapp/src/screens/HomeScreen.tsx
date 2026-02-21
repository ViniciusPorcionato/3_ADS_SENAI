/**
 * Tela inicial do app SOS Manutenção
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { Button } from '../components';
import { commonStyles } from '../styles/commonStyles';

export const HomeScreen: React.FC = () => {
  const handleCallService = (category: string) => {
    console.log(`Chamando serviço de: ${category}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerTitle}>SOS Manutenção</Text>
        <Text style={styles.headerSubtitle}>Ajuda em minutos</Text>
      </View>

      {/* Emergency Button */}
      <View style={styles.emergencySection}>
        <Button
          title="🚨 CHAMAR AJUDA"
          variant="danger"
          size="large"
          onPress={() => handleCallService('emergency')}
          style={styles.emergencyButton}
        />
      </View>

      {/* Services */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Selecione um serviço</Text>

        <Button
          title="🔧 Encanador"
          variant="primary"
          size="medium"
          onPress={() => handleCallService('plumber')}
          style={styles.serviceButton}
        />

        <Button
          title="⚡ Eletricista"
          variant="primary"
          size="medium"
          onPress={() => handleCallService('electrician')}
          style={styles.serviceButton}
        />

        <Button
          title="🔑 Chaveiro"
          variant="primary"
          size="medium"
          onPress={() => handleCallService('locksmith')}
          style={styles.serviceButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    backgroundColor: COLORS.primaryDark,
    paddingVertical: SPACING['3xl'],
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: SPACING.md,
  },

  headerTitle: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    color: COLORS.white,
  },

  headerSubtitle: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.lightGray,
    marginTop: SPACING.sm,
  },

  emergencySection: {
    paddingVertical: SPACING['2xl'],
    paddingHorizontal: SPACING.lg,
  },

  emergencyButton: {
    height: 80,
  },

  servicesSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['3xl'],
  },

  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SPACING.lg,
  },

  serviceButton: {
    marginBottom: SPACING.md,
  },
});
