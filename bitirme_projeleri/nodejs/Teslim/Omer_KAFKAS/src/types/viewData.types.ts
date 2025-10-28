import { IUser } from '../models/userModel';
import { INews } from '../models/newsModel';

export interface BasePageData {
    title: string;
    page: string;
    user?: IUser;
}

export interface HomePageData extends BasePageData {
    news?: INews[];
    categories?: string[];
    currentCategory?: string;
    currentPage?: number;
    totalPages?: number;
}

export interface NewsDetailData extends BasePageData {
    news?: INews;
    relatedNews?: INews[];
    newsId?: string;
}

export interface LoginPageData extends BasePageData {
    errorMessage?: string;
    successMessage?: string;
}

export interface RegisterPageData extends BasePageData {
    errorMessage?: string;
}

export interface ProfilePageData extends BasePageData {
    user: IUser;
    myNews?: INews[];
}

export interface MyNewsPageData extends BasePageData {
    news: INews[];
}

export interface CreateNewsPageData extends BasePageData {
    categories: string[];
}

export interface ErrorPageData extends BasePageData {
    errorCode: number;
    errorMessage: string;
}
