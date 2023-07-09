export interface Agenda {
  id: number;
  uid: number;
  image: string;
  description: string;
  official: boolean;
  title: string;
  slug: string;
}
export interface IAggregation {
  categories: {
    label: string;
    values: ICategory[];
  };
}

export interface ICategory {
  id: number;
  value: string;
  label: string;
  info: null | any;
  display: boolean;
  key: number;
  eventCount: number;
}

export interface IEvent {
  events(events: any): never[];
  total: number;
  aggregations: {
    categories: IAggregation;
  };
  id: number;
  longDescription: {
    fr: string;
  };
  image: {
    filename: string;
    size: {
      width: number;
      height: number;
    };
    variants: Array<{
      filename: string;
      size: {
        width: number;
        height: number;
      };
      type: string;
    }>;
    base: string;
  };
  dateRange: {
    [key: string]: string;
  };
  description: {
    fr: string;
  };
  title: {
    fr: string;
  };
  location?: {
    city: string;
    timezone: string;
    postalCode: string;
    address: string;
    name: string;
  };
  keywords: {
    [lang: string]: string[];
  };
  uid: number;
  conditions: {
    fr: string;
  };
  age: {
    min: string;
    max: string;
  };

  timings: Array<{
    begin: string;
    end: string;
  }>;

  registration: Array<{
    type: string;
    value: string;
  }>;
  accessibility: {
    hi: string;
    ii: string;
    vi: string;
    mi: string;
    pi: string;
  };
  after: any[];
  sort: string;
}

export interface DateForm {
  onSubmit: (date: Date) => void;
}
