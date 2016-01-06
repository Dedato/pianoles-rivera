<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

$context                = Timber::get_context();
$context['post']        = Timber::get_post();
$context['sections']    = get_field('one_page_sections');
$templates              = array('index.twig');


if( have_rows('one_page_sections') ):
  while ( have_rows('one_page_sections') ) : the_row();
    if( get_row_layout() == 'artist_grid' ):
      // Get connected artists
      $ids  = get_sub_field('section_artists', false, false);
      $args = array(
        'post_type'       => 'artist',
        'post__in'		    => $ids,
        //'orderby'       => 'post__in',
        'orderby'         => 'name',
        'order'           => 'ASC',
        'posts_per_page'	=> -1
      );
      $context['artists'] = Timber::get_posts($args);
    elseif( get_row_layout() == 'carousel' ):  
      $context['slides']  = get_sub_field('section_slides');
    elseif( get_row_layout() == 'social_media_grid' ):  
      $context['networks'] = get_sub_field('section_social_networks');  
    endif;
  endwhile;
endif;

Timber::render( $templates, $context );