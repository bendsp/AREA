import { SelectTimeData, TimeData } from "../time/time.interface";
import { SelectEmailData, MailData } from "../mailing/mailing.interface";
import { PokemonData } from "src/pokemon/pokemon.interface";

export type TableNames = 'Gmail' | 'Time' | 'User'| 'Area' | 'SendRandomPokemon';
export type serviceName = 'Gmail' | 'Time';

export interface GmailTable  {
    TablesName: "Gmail";
    value: SelectEmailData;
}

export interface SendRandomPokemonTable  {
    TablesName: "SendRandomPokemon";
    value: SelectPokemonData;
}

export interface TimeTable  {
    TablesName: "Time";
    value : SelectTimeData ;
}

export interface UserTable {
    TablesName: "User";
    value: User;
}

export interface AreaTable{
    TablesName: "Area";
    value: SelectAreaData;
}

export interface SelectPokemonData {
    TablesName: "SendRandomPokemon";
    value: PokemonData;
}

export interface PutData {
    user_id: string;
    area_id: number;
    TablesName: TableNames | "";
    value: MailData | TimeData | User | Area | {};
}

// export type PutData = {user_id: string; area_id: number;} & (GmailTable | TimeTable | UserTable | AreaTable | {TablesName: ""; value: {}});

export type Tables = GmailTable | TimeTable | UserTable | AreaTable | SelectPokemonData;

export interface Area {
    area_name: string
    nb_reaction: number;
}

export interface SelectAreaData {
    user_id: string;
    area_id: number;
    area_name: string;
    nb_reaction: number;
}

export interface User {
    user_id: string;
    email: string;
    username: string;
    nb_area: number;
}
