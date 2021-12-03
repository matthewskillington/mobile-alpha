/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

type Symbol = {
  symbol: string
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
  Prediction: Symbol;
  Modal: Symbol;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
RootStackParamList,
Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
BottomTabScreenProps<RootTabParamList, Screen>,
NativeStackScreenProps<RootStackParamList>
>;

export type RootTabNavigation = CompositeNavigationProp<BottomTabNavigationProp<RootTabParamList, 'TabOne'>, NativeStackNavigationProp<RootStackParamList, 'Root'>>;
export type ModalScreenRouteProps = { route: RouteProp<RootStackParamList, 'Modal'> };

export enum Months {
  Jan = '01',
  Feb = '02',
  Mar = '03',
  Apr = '04',
  May = '05',
  Jun = '06',
  Jul = '07',
  Aug = '08',
  Sep = '09',
  Oct = '10',
  Nov = '11',
  Dec = '12',
}
