export interface BookPoseAndDimensions {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
  isDragging: boolean;
}

export type BookRating = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type Book = {
  id: string;
  title: string;
  author: string;
  pages: number;
  size: [number, number, number]; //width x length x depth
  summary: string;
  publish_date: Date;
  audience_rating: number;
  cover_image: string;
  spine_image: string;
  imported: string | undefined;
  properties: BookProperty[];
  reviews: BookReview[];
};

export type BookPropertyTypes = "text" | "number" | "checkbox" | "multi" | "select";

export type BookProperty = {
  id: string;
  name: string;
  type: BookPropertyTypes;
  value: unknown;
  required: boolean;
};

export type BookReview = {
  id: string;
  date_read: Date;
  review: string;
  rating: BookRating;
  dnf: boolean;
};

export type BookStack = {
  id: string;
  name: string;
  filters: BookStackFilter<BookStackFilterTypes>[];
  statistics: BookStackStatistics[];
};

export type BookStackFilterTypes = "filter" | "order_by" | "group_by";
export type BookStackFilterOperations = {
  filter: "includes" | "equal_to" | "greater_than" | "greater_than_or_equal_to" | "less_than" | "less_than_or_equal_to";
  order_by: "ascending" | "descending" | "alphabetically" | "most recent" | "least recent";
  group_by: undefined;
};
export type BookStackFilterComparisons = {
  filter: "and" | "or" | undefined;
  order_by: undefined;
  group_by: undefined;
};

export type BookStackFilter<FilterType extends BookStackFilterTypes> = {
  id: string;
  type: FilterType;
  property: string; // id of BookProperty
  operation: BookStackFilterOperations[FilterType];
  comparisons: BookStackFilterComparisons[FilterType];
};

export type BookStackStatistics = {
  id: string;
  property: string; // id of BookProperty
  grouped_by: string | undefined;
  ordered_by: string | undefined;
  operation: "sum" | "average" | "range";
  display: "text" | "icon" | "pie_chart" | "bar_chart" | "scale";
};