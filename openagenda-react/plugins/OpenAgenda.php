<?php
/**
 * Plugin Name:       Open-Agenda
 * Description:       OpenAgenda plugin WordPress/React
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Gleen Camille
 */

/**
 * Init Admin Menu.
 *
 * @return void
 */

add_action('admin_menu', 'openagenda_init_menu');

function openagenda_init_menu()
{
    add_menu_page(
        __('OpenAgenda unilim', 'openagenda'),
        __('OpenAgenda unilim', 'openagenda'),
        'manage_options',
        'openagenda',
        'openagenda_admin_page',
        'dashicons-admin-post',
        '2.1'
    );
}

/**
 * Init Admin Page.
 *
 * @return void
 */
function openagenda_admin_page()
{
    require_once plugin_dir_path(__FILE__) . 'templates/app.php';
}

add_action('admin_enqueue_scripts', 'openagenda_admin_enqueue_scripts');

/**
 * Enqueue scripts and styles.
 *
 * @return void
 */
function openagenda_admin_enqueue_scripts()
{
    wp_enqueue_style('ul-openagenda-style', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_enqueue_script('ul-openagenda-script', plugin_dir_url(__FILE__) . 'build/index.js', array( 'wp-element' ), '1.0.0', true);
    wp_localize_script('ul-openagenda-script', 'WPURLS', array( 'siteurl' => get_option('siteurl') ));
}
// Uninstall procedure.
register_uninstall_hook(__FILE__, 'openagenda_uninstallation');

/**
 * Uninstall procedure.
 * 
 * We're not doing anything here, so no options will be deleted.
 */
function openagenda_uninstallation() {
    // No action taken.
}

/*Custom Post type */
function cw_post_type_openagenda()
{
    $supports = array(
        'title', // post title
        'editor', // post content
        'author', // post author
        'thumbnail', // featured images
        'excerpt', // post excerpt
        'custom-fields', // custom fields
        'comments', // post comments
        'revisions', // post revisions
        'post-formats', // post formats
    );

    $labels = array(
        'name' => _x('openagenda', 'plural'),
        'singular_name' => _x('openagenda', 'singular'),
        'menu_name' => _x('openagenda', 'admin menu'),
        'name_admin_bar' => _x('openagenda', 'admin bar'),
        'add_new' => _x('Add New', 'add new'),
        'add_new_item' => __('Add New openagenda'),
        'new_item' => __('New openagenda'),
        'edit_item' => __('Edit openagenda'),
        'view_item' => __('View openagenda'),
        'all_items' => __('All openagenda'),
        'search_items' => __('Search openagenda'),
        'not_found' => __('No openagenda found.'),
    );

    $args = array(
        'supports' => $supports,
        'labels' => $labels,
        'public' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'openagenda'),
        'has_archive' => true,
        'hierarchical' => false,
    );

    register_post_type('openagenda', $args);
}

add_action('init', 'cw_post_type_openagenda');

// Récupération de données depuis la base de données
function get_agenda_data()
{
    // Récupérer les données depuis wp_options
    $data = get_option('nom_de_votre_option');

    if ($data && is_array($data)) {
        $id = $data['id'];
        $fields = $data['fields'];
        $pagination = $data['pagination'];

        return array(
            'id' => $id,
            'fields' => $fields,
            'pagination' => $pagination
        );
    }

    return array();
}
/**
 * API REST
 */
add_action('rest_api_init', 'init_rest_route');

function init_rest_route()
{
    register_rest_route('openagenda', '/agendas', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_agendas',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
        ));
    register_rest_route('openagenda', '/events/category', array(
        'methods' => WP_REST_Server::READABLE,
        'callback' => 'get_agendas_all',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
        ));
    register_rest_route('openagenda', '/events/categories/(?P<id>\d+(,\d+)*)', array(
        'methods' => 'GET',
        'callback' => 'get_events_cat',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
    ));
    register_rest_route('openagenda', '/id/(?P<id>\d+(,\d+)*)/events(?P<includeFields>.+)(?P<keyword>.+)(?P<oaq>.+)(?P<timeframe>.+)(?P<uid>.+)(?P<categories>.+)', array(
        'methods' => 'POST',
        'callback' => 'get_events',
        'show_in_index' => true,
        'permission_callback' => '__return_true',
    ));
}



function get_agendas()
{
    $response = wp_remote_get(
        'http://symfony/openagenda/agendas',
        array(
    'timeout' => 120,
    )
    );
    $data = wp_remote_retrieve_body($response);

    return $data ?
        new WP_REST_Response(json_decode($data, true)) :
        new WP_Error('no-content', __('No content', 'openagenda'), array('status' => 500));
}


function get_agendas_all()
{
    $response = wp_remote_get(
        'http://symfony/openagenda/events/category',
        array(
    'timeout' => 120,
    )
    );
    $data = wp_remote_retrieve_body($response);

    return $data ?
        new WP_REST_Response(json_decode($data, true)) :
        new WP_Error('no-content', __('No content', 'openagenda'), array('status' => 500));
}

function get_events_cat($request)
{
    $ids = $request->get_param('id');
    $idArray = explode(',', $ids);
    $idParams = implode(",", $idArray);

    $response = wp_remote_get(
        "http://symfony/openagenda/events/categories/$idParams",
        array(
    'timeout' => 120,
    )
    );

    $data = wp_remote_retrieve_body($response);

    return $data ?
        new WP_REST_Response(json_decode($data, true)) :
        new WP_Error('no-content', __('No content', 'openagenda'), array('status' => 500));
}
function get_events($request)
{
    $ids = $request->get_param('id');
    $idArray = explode(',', $ids);
    $idParams = implode(",", $idArray);

    $fields = $request->get_param('fields');
    $fieldArray = explode('includeFields[]=', $fields);
    $fieldParams = implode("&includeFields[]=", $fieldArray);

    $oaq = $request->get_param('oaq');
    $keyword = $request->get_param('keyword');
    $timeframe = $request->get_param('timeframe');
    $categories = $request->get_param('categories');
    $uid = $request->get_param('uid');


    $url = "http://symfony/openagenda/id/$idParams/events/";

    $body = array();

    if (!empty($fieldParams)) {
        $body['includeFields'] = $fieldParams;
    }
    
    if (!empty($keyword)) {
        $body['keyword'] = $keyword;
    }

    if (!empty($oaq)) {
        $body['oaq'] = $oaq;
    }
    if (!empty($timeframe)) {
        $body['timeframe'] = $timeframe;
    }
    if (!empty($categories)) {
        $body['categories'] = $categories;
    }
    if (!empty($uid)) {
        $body['uid'] = $uid;
    }

    $response = wp_remote_post(
        $url,
        array(
            'timeout' => 120,
            'headers' => array('Content-Type' => 'application/json; charset=utf-8'),
            'body' => json_encode($body)
        )
    );

    if (is_wp_error($response)) {
        return new WP_Error('no-content', __('Failed to retrieve content', 'openagenda'), array( 'status' => 500 ));
    }

    $response_body = wp_remote_retrieve_body($response);

    return $response_body ?
        new WP_REST_Response(json_decode($response_body, true)) :
        new WP_Error('no-content', __('No content', 'openagenda'), array('status' => 500));
}



global $ul_openagenda_url;
$ul_openagenda_url = '';

function ul_openagenda_sc($atts)
{
    $id = isset($atts['id']) ? $atts['id'] : null;
    $fields = isset($atts['fields']) ? $atts['fields'] : '';
    $pagination = isset($atts['pagination']) ? $atts['pagination'] : '';

    wp_enqueue_style('ul-openagenda-style', plugin_dir_url(__FILE__) . 'build/index.css');
    wp_enqueue_script('ul-openagenda-script', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-element'), '1.0.0', true);
    wp_localize_script('ul-openagenda-script', 'WPURLS', array('siteurl' => get_option('siteurl'), 'ajaxurl' => admin_url('admin-ajax.php')));
    wp_localize_script('ul-openagenda-script', 'OpenAgendaData', array(
        'id' => $id,
        'fields' => $fields,
        'pagination' => $pagination,
    ));

    ob_start();
    ?>
      <div id="ul_openagenda_front">
        <h2>Loading...</h2>
      </div>
    <?php

           return ob_get_clean();

}

add_shortcode('ul_openagenda', 'ul_openagenda_sc');
