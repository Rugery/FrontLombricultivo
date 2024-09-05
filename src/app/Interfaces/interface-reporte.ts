export interface DetalleReporte {
  PkusrReporte: string;
  FechaReporte: string;
  FkregistroLomb: string;
  FktipoReporte: string;
  oFKTipoReporte: {
    NomTipoReporte: string;
  };
  oConsumoRecursos: ConsumoRecurso;
  oEventoSistemas: EventoSistema;
  oLombrizs: Lombriz[];
  oMantenimientos: Mantenimiento;
  oSustratos: Sustrato;
  detalleVisible?: boolean;
  detalles: {
    oConsumoRecursos: ConsumoRecurso;
    oEventoSistemas: EventoSistema;
    oLombrizs: Lombriz[];
    oMantenimientos: Mantenimiento;
    oSustratos: Sustrato;
  };
}
export interface TipoReporte {
    NomTipoReporte: string;
}
export interface ConsumoRecurso {
    CantAguaConsumo: number;
    CantEnergiaConsumo: number;
    DescConsumo: string;
}

export interface EventoSistema {
    DescEvento: string;
    AccionEvento: string;
    AnomaliaEvento: string;
}

export interface Lombriz {
    PesoLombriz: number;
    EspecieLombriz: string;
    LongitudLombriz: number;
    EtapaReprLombriz: string;
}

export interface Mantenimiento {
    TipoMantenimiento: string;
    DescMantenimiento: string;
}

export interface Sustrato {
    PhSustrato: number;
    ComposSustrato: string;
    NivNutSustrato: string;
    TempSustrato: number;
    HumSustrato: number;
}

export interface Reporte {
  tipoReporte: TipoReporte;
  eventoSistema: EventoSistema;
  mantenimiento: Mantenimiento;
  sustrato: Sustrato;
  consumo: ConsumoRecurso
}

