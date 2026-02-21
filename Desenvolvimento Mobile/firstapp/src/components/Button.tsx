/**
 * Componente de botão reutilizável
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_WEIGHTS } from '../constants';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  onPress,
  style,
  ...props
}) => {
  const containerStyle: ViewStyle[] = [
    styles.button,
    styles[`button_${variant}`],
    styles[`button_${size}`],
    style as ViewStyle,
  ];

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[styles.text, styles[`text_${size}`]]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  button_primary: {
    backgroundColor: COLORS.primary,
  },

  button_secondary: {
    backgroundColor: COLORS.mediumGray,
  },

  button_danger: {
    backgroundColor: COLORS.primaryDark,
  },

  button_small: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },

  button_medium: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },

  button_large: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
  },

  text: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semibold,
  },

  text_small: {
    fontSize: 12,
  },

  text_medium: {
    fontSize: 14,
  },

  text_large: {
    fontSize: 16,
  },
});
