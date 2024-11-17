export interface kitsuList {
    data:  kitsu[];
    meta:  WelcomeMeta;
    links: WelcomeLinks;
}

export interface kitsu {
    id:            string;
    type:          string;
    links:         DatumLinks;
    attributes:    Attributes;
    relationships: { [key: string]: Relationship };
}

export interface Attributes {
    createdAt:           Date;
    updatedAt:           Date;
    slug:                string;
    synopsis:            string;
    description:         string;
    coverImageTopOffset: number;
    titles:              Titles;
    canonicalTitle:      string;
    abbreviatedTitles:   string[];
    averageRating:       string;
    ratingFrequencies:   { [key: string]: string };
    userCount:           number;
    favoritesCount:      number;
    startDate:           Date;
    endDate:             Date;
    nextRelease:         null;
    popularityRank:      number;
    ratingRank:          number;
    ageRating:           string;
    ageRatingGuide:      string;
    subtype:             string;
    status:              string;
    tba:                 null | string;
    posterImage:         PosterImage;
    coverImage:          CoverImage;
    episodeCount:        number;
    episodeLength:       number;
    totalLength:         number;
    youtubeVideoId:      string;
    showType:            string;
    nsfw:                boolean;
}

export interface CoverImage {
    tiny:     string;
    large:    string;
    small:    string;
    original: string;
    meta:     CoverImageMeta;
}

export interface CoverImageMeta {
    dimensions: Dimensions;
}

export interface Dimensions {
    tiny:    Large;
    large:   Large;
    small:   Large;
    medium?: Large;
}

export interface Large {
    width:  number;
    height: number;
}

export interface PosterImage {
    tiny:     string;
    large:    string;
    small:    string;
    medium:   string;
    original: string;
    meta:     CoverImageMeta;
}

export interface Titles {
    en:     string;
    en_jp:  string;
    ja_jp:  string;
    en_us?: string;
}

export interface DatumLinks {
    self: string;
}

export interface Relationship {
    links: RelationshipLinks;
}

export interface RelationshipLinks {
    self:    string;
    related: string;
}

export interface WelcomeLinks {
    first: string;
    next:  string;
    last:  string;
}

export interface WelcomeMeta {
    count: number;
}