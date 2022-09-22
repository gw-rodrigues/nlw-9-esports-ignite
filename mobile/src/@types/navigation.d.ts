export interface GameParams {
  id: string;
  title: string;
  bannerUrl: string;
}

/**
 * CRIAMOS tipagem de navegação disponível para toda a nossa app.
 *
 * home: !undefined; -> significa que nao precisa de nenhum parâmetro
 */

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: GameParams;
    }
  }
}
