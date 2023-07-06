export class Entier {
    private readonly _valeur: number;
    public static readonly Zéro: Entier = new Entier(0);

    public constructor(valeur: number) {
        if(Math.round(valeur) !== valeur)
            throw new Error("Not an integer");

        this._valeur = Entier.RedresserZéroNégatif(valeur);
    }

    public Décrémenter() {
        return new Entier(this._valeur - 1);
    }

    private static RedresserZéroNégatif(nombre : number) {
        if(nombre == -0) return 0;
        return nombre;
    }

    Incrémenter() {
        return new Entier(this._valeur + 1);
    }

    Modulo(other: Entier) {
        const valeurOther = other._valeur;

        const valeurRéduiteSignée = (this._valeur % valeurOther) % -valeurOther;
        const valeurNonSignée = valeurRéduiteSignée + valeurOther;
        const valeurRéduiteNonSignée = valeurNonSignée % valeurOther;

        return new Entier(valeurRéduiteNonSignée);
    }

    public Equals(other: Entier) {
        return this._valeur === other._valeur;
    }
    
    getValue() {
        return this._valeur;
    }

    toString() {
        return this._valeur.toString()
    }
}